import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from "@angular/common/http";
import { BehaviorSubject, EMPTY, Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthService } from "src/app/features/auth/services/auth.service";
import { filter, switchMap, take, tap } from "rxjs/operators";
import { PreRequestAction } from "../enums/PreRequestAction";
import { checkAccessAndRefreshTokenExpiration } from "../utils/auth.utils";

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
  providedIn: "root",
})
export class ApiPrefixInterceptor implements HttpInterceptor {
  isRefreshing = false;
  constructor(private _authService: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes("assets")) {
      return next.handle(request);
    }
    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({
        url: environment.SERVER_ENDPOINT + request.url,
      });
    }

    request = request.clone({
      withCredentials: true,
    });

    let headers: HttpHeaders = request.headers;

    headers = headers.append("Access-Control-Allow-Origin", "*");

    request = request.clone({ headers });
    if (this.isRefreshing === true) {
      this.isRefreshing = false;
      return next.handle(request);
    }

    return this._postRequestAuthAction(request, next);
  }

  private _postRequestAuthAction(request: HttpRequest<any>, next: HttpHandler) {
    switch (checkAccessAndRefreshTokenExpiration()) {
      //refresh token has expired
      case PreRequestAction.Logout:
        this._authService.logout();
        return EMPTY;
      //access token has expired
      case PreRequestAction.Refresh:
        return this.refreshToken(request, next);
      //no token expired
      case PreRequestAction.None:
        return next.handle(
          this.addAuthorizationHeader(request, localStorage.getItem("token"))
        );
    }
  }

  //function to add the new token to the authorization headers
  private addAuthorizationHeader(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    // If there is token then add Authorization header otherwise don't change request
    if (token) {
      return request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    return request;
  }

  //if token has expired run refresh and patch the returned token to the request
  private refreshToken(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.isRefreshing = true;
    return this._authService.refresh().pipe(
      switchMap((res) => {
        return next.handle(
          this.addAuthorizationHeader(request, res.access_token)
        );
      })
    );
  }
}

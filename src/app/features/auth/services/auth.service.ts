import { Injectable } from "@angular/core";
import { LogService } from "../../../core/services/log/log.service";
import { ApiService } from "../../../core/services/api/api.service";
import { UserService } from "../../../core/services/user/user.service";
import jwt_decode from "jwt-decode";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { RegisterUser } from "../models/register-user";
import { Router } from "@angular/router";
import { MessageService } from "src/app/shared/services/message.service";
import { OnenetUser } from "src/app/core/models/onenetUser";
import { DemoTimezone } from "src/app/shared/enums/demoTimezone";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private logger: LogService,
    private api: ApiService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {}

  login(username: string, password: string): Observable<any> {
    const requestData = { username, password };
    this.logger.info("User trying to login");
    return this.api.post(`/login`, requestData).pipe(
      tap((data) => {
        this.setLocalStorage(data);
        this.setUserData();
        this.logger.info("Successful login");
      })
    );
  }

  logout(): void {
    // return this.api
    //   .post(`/logout`, { refresh_token: localStorage.getItem("refresh_token") })
    //   .pipe(
    //     tap((_) => {
          this.logger.info("Logging out");
          this.resetLocalStorage();
          this.userService.setUser(null);
          this.router.navigateByUrl("/auth/login");
          this.messageService.messageNotifier$.next([{
            text: "Logged out",
            type: "success",
          }]);
      //   })
      // );
  }

  register(user: RegisterUser): Observable<RegisterUser> {
    this.logger.info("Trying to add new user");
    return this.api.post(`/register`, user).pipe(
      tap((_) => {
        this.messageService.messageNotifier$.next([{
          text: "Registration was successful",
          type: "success",
        }]);
      })
    );
  }

  refresh(): Observable<any> {
    return this.api
      .post(`/refresh`, {
        refresh_token: localStorage.getItem("refresh_token"),
      })
      .pipe(
        tap((data) => {
          this.setLocalStorage(data);
          this.logger.info("Successful refresh");
          this.setUserData();
        })
      );
  }

  setUserData(logout = false): void {
    const token = localStorage.getItem("token");
    if (token) {
      const data: any = jwt_decode(token);
      const user: OnenetUser = {
        id: data.sub,
        demo: data.demo,
        email: data.email,
        username: data.preferred_username,
        timezone: data.demo
          ? DemoTimezone[data.demo.toUpperCase()]
          : DemoTimezone.MYTILINAIOS,
        dateFormat: "DD/MM/YYYY",
      };

      this.userService.setUser(user);
      return;
    }
    const user: OnenetUser = {
      id: undefined,
      demo: undefined,
      email: undefined,
      username: undefined,
      timezone: undefined,
    };

    this.userService.setUser(user);
  }


  private setLocalStorage(data: any): void {
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    localStorage.setItem(
      "expires_in",
      String(Date.now() + data.expires_in * 1000)
    );
    localStorage.setItem(
      "refresh_expires_in",
      String(Date.now() + data.refresh_expires_in * 1000)
    );
  }

  // Remove only token related entries from local storage
  public resetLocalStorage(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expires_in");
    localStorage.removeItem("refresh_expires_in");
  }

  public setAuthenticatedUser() {
    this.setUserData();
  }

  forgotPassword(username: string): Observable<any> {
    return this.api.post(`/forgot-password?username=${username}`, {
      username,
    });
  }

  testAuthentication() {
    this.api.get(`/test/consumer`).subscribe();
  }
  
}

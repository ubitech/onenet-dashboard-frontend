import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {LogService} from '../services/log/log.service';
import {MessageService} from '../../shared/services/message.service';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Message } from 'src/app/shared/interfaces/api-message';

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private _log: LogService,
              private _router: Router,
              private _messageService: MessageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: any): Observable<HttpEvent<any>> {
    //if refresh doesn't need authorization remove the !response.url.includes('refresh') condition
    if (response.status === 401 && this._router.url !== '/auth/login' && !response.url.includes('refresh')) {
      this._log.info('Navigate to login page');
      this._router.navigate(['auth/login']);
      throw response;
    }
    if(!response.error?.message) {
      this._messageService.showMsg([new Message(response.error)]);
      throw response;
    }
    this._messageService.showMsg([new Message(response.error?.message)]);
    throw response;
  }


}


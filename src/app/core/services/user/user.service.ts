import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {LogService} from '../log/log.service';
import {ApiService} from '../api/api.service';
import { OnenetUser } from '../../models/onenetUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private $user: BehaviorSubject<OnenetUser| null>;

  private _timezoneSubj = new BehaviorSubject<string>(localStorage.getItem('timezone'));
  private _dateFormatSubj = new BehaviorSubject<string>(localStorage.getItem('dateFormat'));

  constructor(public logger: LogService,
              private api: ApiService,
              ) {
    this.$user = new BehaviorSubject<OnenetUser>(new OnenetUser());
  }

  setUser(user): void {
    this.$user.next(user);
  }

  getUser(): Observable<OnenetUser> {
    return this.$user.asObservable();
  }

  getProfile(): Promise<OnenetUser> {
    return this.api.get('/profile')
      .toPromise();
  }

  updateAvatar(avatar: number): Promise<any> {
    return this.api.post('/profile/avatar', {avatar})
      .toPromise();
  }

  getDateFormat(): BehaviorSubject<string> {
    return this._dateFormatSubj;
  }
  //doesn't change user object, it just saves it temporarily in local storage
  updateDateFormat(dateformat: string): void {
    localStorage.setItem('dateFormat', dateformat)
    this._dateFormatSubj.next(dateformat);
  }
  
  getTimezone(): BehaviorSubject<string> {
    return this._timezoneSubj;
  }
  //doesn't change user object, it just saves it temporarily in local storage
  updateTimezone(timezone: string): void {
    localStorage.setItem('timezone', timezone);
    this._timezoneSubj.next(timezone);
  }

}

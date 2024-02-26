import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  log(msg: any): void {
    console.log(new Date().toLocaleString() + ': ' + JSON.stringify(msg));
  }

  info(msg: any): void {
    console.info(new Date().toLocaleString() + ': ' + JSON.stringify(msg));
  }

  error(msg: any): void {
    console.error(new Date().toLocaleString() + ': ' + JSON.stringify(msg));
  }

  debug(msg: any): void {
    console.debug(new Date().toLocaleString() + ': ' + JSON.stringify(msg));
  }
}

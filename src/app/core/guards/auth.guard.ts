import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { LogService } from "../services/log/log.service";
import { AuthService } from "src/app/features/auth/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    public logger: LogService,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.logger.debug('Auth Guard');
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('refresh_expires_in')) {
        const dateNow = Date.now();
        const expire: any = localStorage.getItem('refresh_expires_in');
        const temp = (expire - dateNow) / 1000;
        if (temp > 0) {
          return true;
        } else {
          console.log('Refresh token has expired');
          this.authService.resetLocalStorage();
          this.router.navigate(['/auth/login']);
          return false;
        }
      } else {
        this.authService.resetLocalStorage();
        this.router.navigate(['/auth/login']);
        return false;
      }
    } else {
      this.authService.resetLocalStorage();
      this.router.navigate(['/auth/login']);
      return false;
    }
   }
}

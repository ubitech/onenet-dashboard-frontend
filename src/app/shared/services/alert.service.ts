import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { ApiService } from "src/app/core/services/api/api.service";
import { LoaderService } from "src/app/shared/services/loader.service";
import { environment } from "src/environments/environment";
import { Loader } from "src/app/shared/enums/loader";
import { UserService } from "src/app/core/services/user/user.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: "root",
})
export class AlertService {
  private apiPrefix = environment.SERVER_ENDPOINT;

  private $getLatestAlerts = new Subject<any>();
  public getLatestAlertsObs = this.$getLatestAlerts.asObservable();

  eventSource: EventSource;

  lastAbnormalIps = JSON.parse(localStorage.getItem('lastAbnormalIps')) || [];

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private api: ApiService,
    private _snackBar: MatSnackBar,
    private _loaderService: LoaderService,
    private _userService: UserService
  ) {
    this._loaderService.addLoader(Loader.GET_LATEST_ALERTS);

    //close eventsource when logout
    this._userService.getUser().subscribe((res) => {
      if (this.eventSource && !res) {
        this.eventSource.close();
      }
    });
  }

  public getLatestAlerts() {
    //if event source is initialized for the first time start loader
    if (!this.eventSource) {
      this._loaderService.start(Loader.GET_LATEST_ALERTS);
    }
    //create the event source
    this.eventSource = new EventSource(
      `${this.apiPrefix}/alerts/latest-alert-sse`
    );
    //subscription for messages witch the send it via $getLatestAlerts
    this.eventSource.onmessage = (event: MessageEvent<any>) => {
      this.$getLatestAlerts.next(event);
      this._loaderService.stop(Loader.GET_LATEST_ALERTS);
    };

    //subscription for error messages
    this.eventSource.onerror = (error: any) => {
      console.error('error', error)
      console.log(JSON.stringify(error, ["message", "arguments", "type", "name"]))
      this._loaderService.stop(Loader.GET_LATEST_ALERTS);
    };
  }

  public newLatestAlertsSubscription() {
    return this.getLatestAlertsObs
      .pipe(filter((res: any) => !!res && !!res.data))
      .subscribe({
        next: (res: any) => {
          const data = JSON.parse(res.data);
          let abnormalIps = data.abnormalIps;
          // console.log('abnormalIps =', abnormalIps)
          // Find all IPs included in the current list that are not included in the last list
          let difference = abnormalIps.filter((x: string) => !this.lastAbnormalIps.includes(x));
          // console.log('difference =', difference)
          if (difference.length > 0) {
            let actionText = (this.router.url === '/security-report' ? "OK" : "Go to report");
            let snackBarRef;
            this.ngZone.run(() => snackBarRef = this._snackBar.open("New abnormal clients detected", actionText, { duration: 6000 }))

            snackBarRef.onAction().subscribe(() => {
              this.ngZone.run(() => this.router.navigate(['/security-report']))
            });
          }

          localStorage.setItem('lastAbnormalIps', JSON.stringify(abnormalIps));
          this.lastAbnormalIps = abnormalIps;
        },
      })
  }
}


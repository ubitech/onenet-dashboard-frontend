import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { finalize, tap, switchMap } from "rxjs/operators";
import { ApiService } from "../../../core/services/api/api.service";
import { LoaderService } from "src/app/shared/services/loader.service";
import { Loader } from "src/app/shared/enums/loader";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private apiPrefix = environment.SERVER_ENDPOINT;

  public $selectedConnector = new BehaviorSubject<string>("");

  public $selectedAnomalyDetectionTimeframe = new BehaviorSubject<string>("");

  private $getAnomalyDetectionData = new Subject<any>();
  public getAnomalyDetectionDataObs =
    this.$getAnomalyDetectionData.asObservable();

  private $getSecurityReportData = new Subject<any>();
  public getSecurityReportDataObs =
    this.$getSecurityReportData.asObservable();

  private $getHealthCheckData = new Subject<any>();
  public getHealthCheckDataObs =
    this.$getHealthCheckData.asObservable();

  constructor(private api: ApiService, private _loaderService: LoaderService) {
    this._loaderService.addLoader(Loader.GET_SECURITY_REPORT_DATA);
  }

  //TODO: Just for testing, remove it when it's no longer needed
  testConsumer(): void {
    this.api
      .get(`/test/consumer`)
      .pipe(
        tap((data) => {
          console.log(data);
        })
      )
      .subscribe();
  }
  public getAnomalyDetectionData() {
    this._loaderService.start(Loader.GET_ANOMALY_DETECTION_DATA);

    this.$selectedConnector
    .pipe(
      switchMap((newConnector) =>
        this.api
          .get(`/analytics/anomaly_detection/${newConnector}?minutes=${this.$selectedAnomalyDetectionTimeframe.value}`)
          .pipe(
            tap((data) => {
              this.$getAnomalyDetectionData.next(data);
            }),
            finalize(() => {
              this._loaderService.stop(Loader.GET_ANOMALY_DETECTION_DATA);
            })
          )
      )
    )
    .subscribe();

    this.$selectedAnomalyDetectionTimeframe
    .pipe(
      switchMap((newTimeframe) =>
        this.api
          .get(`/analytics/anomaly_detection/${this.$selectedConnector.value}?minutes=${newTimeframe}`)
          .pipe(
            tap((data) => {
              this.$getAnomalyDetectionData.next(data);
            }),
            finalize(() => {
              this._loaderService.stop(Loader.GET_ANOMALY_DETECTION_DATA);
            })
          )
      )
    )
    .subscribe();


  }

  public getSecurityReportData() {
    this._loaderService.start(Loader.GET_SECURITY_REPORT_DATA);

    this.api
    .get(`/analytics/security_report`)
    .pipe(
      tap((data) => {
        this.$getSecurityReportData.next(data);
      }),
      finalize(() => {
        this._loaderService.stop(Loader.GET_SECURITY_REPORT_DATA);
      })
    )
    .subscribe();
  }

  public getHealthCheckData() {
    this._loaderService.start(Loader.GET_SECURITY_REPORT_DATA);

    this.api
    .get(`${this.apiPrefix}/monitoring/network/connectors-health-check`)
    .pipe(
      tap((data) => {
        this.$getHealthCheckData.next(data);
      }),
      finalize(() => {
        this._loaderService.stop(Loader.GET_SECURITY_REPORT_DATA);
      })
    )
    .subscribe();
  }
}

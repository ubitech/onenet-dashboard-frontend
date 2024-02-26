import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { switchMap, filter, finalize, tap } from "rxjs/operators";
import { ApiService } from "src/app/core/services/api/api.service";
import { LoaderService } from "src/app/shared/services/loader.service";
import { environment } from "src/environments/environment";
import { Loader } from "src/app/shared/enums/loader";
import { UserService } from "src/app/core/services/user/user.service";
import { DashboardService } from "./dashboard.service";
import { AdvancedFilteringFilter } from 'src/app/core/models/advancedFilteringFilter';

@Injectable({
  providedIn: "root",
})
export class NetworkMonitoringAnalyticsService {
  private apiPrefix = environment.SERVER_ENDPOINT;
  public $selectedConnector = new BehaviorSubject<string>("");
  private $getHttpTransactionMonthlyEvents = new Subject<any>();

  private $getConnectorList = new Subject<any>();
  public getConnectorListObs =
    this.$getConnectorList.asObservable();

  public getHttpTransactionMonthlyEventsObs =
    this.$getHttpTransactionMonthlyEvents.asObservable();

  private $getHttpTransactionLatestEvents = new Subject<any>();
  public getHttpTransactionLatestEventsObs =
    this.$getHttpTransactionLatestEvents.asObservable();

  private $getHttpTransactionMonthlyPerCountryEvents = new Subject<any>();
  public getHttpTransactionMonthlyPerCountryEventsObs =
    this.$getHttpTransactionMonthlyPerCountryEvents.asObservable();

  private $getHttpTransactionBytesSent = new Subject<any>();
  public getHttpTransactionBytesSentObs =
    this.$getHttpTransactionBytesSent.asObservable();

  private $getHttpTransactionResponseCodes = new Subject<any>();
  public getHttpTransactionResponseCodesObs =
    this.$getHttpTransactionResponseCodes.asObservable();

  private $getAdvancedFilteringResults = new Subject<any>();
  public getAdvancedFilteringResultsObs =
      this.$getAdvancedFilteringResults.asObservable();

  eventSource: EventSource;

  constructor(
    private api: ApiService,
    private _loaderService: LoaderService,
    private _userService: UserService
  ) {
    this._loaderService.addLoader(Loader.GET_CONNECTOR_LIST);
    this._loaderService.addLoader(Loader.GET_HTTP_TRANSACTION_LATEST_EVENTS);
    this._loaderService.addLoader(Loader.GET_HTTP_TRANSACTIONS_MONTHLY_EVENTS);
    this._loaderService.addLoader(Loader.GET_HTTP_TRANSACTION_BYTES_SENT);
    this._loaderService.addLoader(Loader.GET_HTTP_TRANSACTION_RESPONSE_CODES);
    this._loaderService.addLoader(Loader.GET_HTTP_TRANSACTIONS_MONTHLY_PER_COUNTRY_EVENTS);
    this._loaderService.addLoader(Loader.GET_ADVANCED_FILTERING_RESULTS);

    //close eventsource when logout
    this._userService.getUser().subscribe((res) => {
      if (this.eventSource && !res) {
        this.eventSource.close();
      }
    });
  }

  public getConnectorList() {
    this._loaderService.start(Loader.GET_CONNECTOR_LIST);

    this.api
      .get(`${this.apiPrefix}/monitoring/network/connectors`)
      .pipe(
        tap((data) => {
          this.$getConnectorList.next(data);
        }),
        finalize(() => {
          this._loaderService.stop(Loader.GET_CONNECTOR_LIST);
        })
      )
      .subscribe();
  }

  //create a new event source for httpTransactionLatestEvents
  public getHttpTransactionLatestEvents(connector: string) {
    //if event source is initialized for the first time start loader
    if (!this.eventSource) {
      this._loaderService.start(Loader.GET_HTTP_TRANSACTION_LATEST_EVENTS);
    }
    //create the event source
    this.eventSource = new EventSource(
      `${this.apiPrefix}/monitoring/network/http-transactions-sse-periodic?connector=${connector}`
    );
    //subscription for messages witch the send it via $getHttpTransactionLatestEvents
    this.eventSource.onmessage = (event: MessageEvent<any>) => {
      this.$getHttpTransactionLatestEvents.next(event);
      this._loaderService.stop(Loader.GET_HTTP_TRANSACTION_LATEST_EVENTS);
    };

    //subscription for error messages
    this.eventSource.onerror = (error: any) => {
      console.error('error', error)
      this._loaderService.stop(Loader.GET_HTTP_TRANSACTION_LATEST_EVENTS);
    };
  }

  public getHttpTransactionMonthlyEvents() {
    this._loaderService.start(Loader.GET_HTTP_TRANSACTIONS_MONTHLY_EVENTS);

    this.$selectedConnector
    .pipe(
      switchMap((newConnector) =>
        this.api
          .get(`${this.apiPrefix}/monitoring/network/http-monthly/${newConnector}`)
          .pipe(
            tap((data) => {
              this.$getHttpTransactionMonthlyEvents.next(data);
            }),
            finalize(() => {
              this._loaderService.stop(Loader.GET_HTTP_TRANSACTIONS_MONTHLY_EVENTS);
            })
          )
      )
    )
    .subscribe();
  }

  public getHttpTransactionMonthlyPerCountryEvents() {
    this._loaderService.start(Loader.GET_HTTP_TRANSACTIONS_MONTHLY_PER_COUNTRY_EVENTS);

    this.$selectedConnector
    .pipe(
      switchMap((newConnector) =>
        this.api
          .get(`${this.apiPrefix}/monitoring/network/http-monthly-per-country/${newConnector}`)
          .pipe(
            tap((data) => {
              this.$getHttpTransactionMonthlyPerCountryEvents.next(data);
            }),
            finalize(() => {
              this._loaderService.stop(Loader.GET_HTTP_TRANSACTIONS_MONTHLY_PER_COUNTRY_EVENTS);
            })
          )
      )
    )
    .subscribe();
  }

  public getHttpTransactionBytesSent() {
    this._loaderService.start(Loader.GET_HTTP_TRANSACTION_BYTES_SENT);

    this.$selectedConnector
    .pipe(
      switchMap((newConnector) =>
        this.api
        .get(`${this.apiPrefix}/monitoring/network/http-bytes-sent/${newConnector}`)
        .pipe(
          tap((data) => {
            this.$getHttpTransactionBytesSent.next(data);
          }),
          finalize(() => {
            this._loaderService.stop(Loader.GET_HTTP_TRANSACTION_BYTES_SENT);
          })
        )
      )
    )
    .subscribe();
  }

  public getHttpTransactionResponseCodes() {
    this._loaderService.start(Loader.GET_HTTP_TRANSACTION_RESPONSE_CODES);

    this.$selectedConnector
    .pipe(
      switchMap((newConnector) =>
        this.api
        .get(`${this.apiPrefix}/monitoring/network/http-response-codes/${newConnector}`)
        .pipe(
          tap((data) => {
            this.$getHttpTransactionResponseCodes.next(data);
          }),
          finalize(() => {
            this._loaderService.stop(Loader.GET_HTTP_TRANSACTION_RESPONSE_CODES);
          })
        )
      )
    )
    .subscribe();
  }

  public getAdvancedFilteringResults(inputFilter: AdvancedFilteringFilter) {
    this._loaderService.start(Loader.GET_ADVANCED_FILTERING_RESULTS);

    this.api
    // We use POST instead of GET because inputFilter so it is easier to pass
    // the inputFilter parameters to the endpoint and to avoid having to encode
    // and decode the parameters from inside the URL.
    .post(`${this.apiPrefix}/monitoring/network/advanced-filtering`, inputFilter)
    .pipe(
      tap((data) => {
        this.$getAdvancedFilteringResults.next(data);
      }),
      finalize(() => {
        this._loaderService.stop(Loader.GET_ADVANCED_FILTERING_RESULTS);
      })
    )
    .subscribe();
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from "@angular/core";
import { ApexAxisChartSeries, ApexXAxis } from "ng-apexcharts";
import { Subject, Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { RouteService } from "src/app/core/services/route/route.service";
import { BarChartOptions } from "src/app/shared/components/types/barChartOptions";
import { NetworkMonitoringAnalyticsService } from "../../services/network-monitoring-analytics.service";
import { DashboardService } from "../../services/dashboard.service";
import * as moment from "moment";
import { Loader } from "src/app/shared/enums/loader";
import { MapChartDataPoint } from 'src/app/features/dashboard/interfaces/MapChartDataPoint';
import { CONNECTOR_LIST } from 'src/app/core/constants/connector-list';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: "app-network-monitoring-analytics",
  templateUrl: "./network-monitoring-analytics.component.html",
  styleUrls: ["./network-monitoring-analytics.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkMonitoringAnalyticsComponent {
  public transactionsTab: string = "Last 24 hours";
  private _subscription = new Subscription();
  public updateDailyChart$ = new Subject<any>();
  public updateMonthlyChart$ = new Subject<any>();
  public dailyDataChartOptions: BarChartOptions = {
    responsive: [
      {
        breakpoint: 1700,
        options: {
          chart: {
            height: "400px",
          },
        },
      },
    ],
    tooltip: {
      enabled: true,
      x: {
        formatter: function (
          value: any,
          { series, seriesIndex, dataPointIndex, w }: any
        ) {
          return moment(value).format("HH:mm").toString();
        },
      },
    },
  };

  public monthlyDataChartOptions: BarChartOptions = {
    responsive: [
      {
        breakpoint: 1700,
        options: {
          chart: {
            height: "400px",
          },
        },
      },
    ],
    tooltip: {
      enabled: true,
      x: {
        formatter: function (
          value: any,
          { series, seriesIndex, dataPointIndex, w }: any
        ) {
          return moment(value).format("YYYY/MM/DD").toString();
        },
      },
    },
  };

  public connectorList: string[] = [];
  public selectedConnector: string = CONNECTOR_LIST.ALL_CONNECTORS;
  public dailyDataChartSeries: ApexAxisChartSeries = [];
  public monthlyDataChartSeries: ApexAxisChartSeries = [];
  public dailyDataChartXAxis: ApexXAxis = {};
  public monthlyDataChartXAxis: ApexXAxis = {};
  public accessMapData: MapChartDataPoint[] = [];
  public dataSentOverTimeChartSeries: ApexAxisChartSeries = [];
  public dataSentOverTimeChartOptions: BarChartOptions = {};
  public dataSentOverTimeChartXAxis = {};
  public responseCodesOverTimeChartSeries: ApexAxisChartSeries = [];
  public responseCodesOverTimeChartOptions: BarChartOptions = {};
  public responseCodesOverTimeChartXAxis = {};

  latestEventsLoader = Loader.GET_HTTP_TRANSACTION_LATEST_EVENTS;
  latestEventsLoading = false;

  monthlyEventsLoader = Loader.GET_HTTP_TRANSACTIONS_MONTHLY_EVENTS;

  monthlyPerCountryEventsLoader = Loader.GET_HTTP_TRANSACTIONS_MONTHLY_PER_COUNTRY_EVENTS;

  bytesSentEventsLoader = Loader.GET_HTTP_TRANSACTION_BYTES_SENT;

  responseCodesEventsLoader = Loader.GET_HTTP_TRANSACTION_RESPONSE_CODES;

  connectorListLoader = Loader.GET_CONNECTOR_LIST;

  1;
  constructor(
    private _routeService: RouteService,
    private _networkMonitoringAnalytics: NetworkMonitoringAnalyticsService,
    private _dashboardService: DashboardService,
    private alertService: AlertService,
    private _cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._routeService.networkMonitoringAnalytics();

    // Initialize selected connector in NetworkMonitoringAnalyticsService and DashboardService
    this._networkMonitoringAnalytics.$selectedConnector.next(this.formatConnectorPath(this.selectedConnector));
    this._dashboardService.$selectedConnector.next(this.formatConnectorPath(this.selectedConnector));

    // Get available connectors
    this._networkMonitoringAnalytics.getConnectorList();
    this._networkMonitoringAnalytics.getConnectorListObs.subscribe(
      {
        next: (data: any) => {
          if (data.length === 0) return;

          this.connectorList = [CONNECTOR_LIST.ALL_CONNECTORS].concat(data);

          this._cd.detectChanges();
        },
      }
    );

    // Get rest of needed data
    this._networkMonitoringAnalytics.getHttpTransactionLatestEvents(this.formatConnectorPath(this.selectedConnector));
    this._networkMonitoringAnalytics.getHttpTransactionMonthlyEvents();
    this._networkMonitoringAnalytics.getHttpTransactionMonthlyPerCountryEvents();
    this._networkMonitoringAnalytics.getHttpTransactionBytesSent();
    this._networkMonitoringAnalytics.getHttpTransactionResponseCodes();

    this._subscription.add(
      this._networkMonitoringAnalytics.getHttpTransactionLatestEventsObs
        .pipe(filter((res: any) => !!res && !!res.data))
        .subscribe({
          next: (res: any) => {
            const data = JSON.parse(res.data);
            if (!data.xaxis || !data.yaxis) return;
            this.dailyDataChartXAxis = {
              type: "category",
              categories: [...data.xaxis],
            };
            this.dailyDataChartSeries = [
              {
                name: "HTTP Transactions",
                data: data.yaxis,
              },
            ];
            this._cd.detectChanges();
          },
        })
    );
    this._subscription.add(
      this._networkMonitoringAnalytics.getHttpTransactionMonthlyEventsObs.subscribe(
        {
          next: (data: any) => {
            if (!data.xaxis || !data.yaxis) return;

            this.monthlyDataChartXAxis = {
              type: "category",
              categories: [...data.xaxis],
            };
            this.monthlyDataChartSeries = [
              {
                name: "HTTP Transactions",
                data: data.yaxis,
              },
            ];
            this._cd.detectChanges();
          },
        }
      )
    );
    this._subscription.add(
      this._networkMonitoringAnalytics.getHttpTransactionMonthlyPerCountryEventsObs.subscribe(
        {
          next: (data: any) => {
            this.accessMapData = data;
            this._cd.detectChanges();
          },
        }
      )
    );
    this._subscription.add(
      this._networkMonitoringAnalytics.getHttpTransactionBytesSentObs.subscribe(
        {
          next: (data: any) => {
            if (!data.xaxis || !data.yaxis) return;

            const kilobytes = data.yaxis.map((bytes: number): number => Math.round(bytes / 1000));
            const formattedDates = data.xaxis.map((date: string): string => new Date(date).toLocaleDateString('en-GB'));

            this.dataSentOverTimeChartSeries = [
              {
                name: "Kilobytes",
                data: [...kilobytes]
              }
            ];

            this.dataSentOverTimeChartXAxis = {
              type: "categories",
              categories: formattedDates
            }

            this._cd.detectChanges();
          },
        }
      )
    );
    this._subscription.add(
      this._networkMonitoringAnalytics.getHttpTransactionResponseCodesObs.subscribe(
        {
          next: (data: any) => {
            if (data.length === 0) return;

            const dates = Array.from(new Set(data.map((item) => item.category)));

            let seriesData: any = [];

            // Aggregate response codes
            const responseCodes = Array.from(new Set(data.map((item) => item.name)));
            for (const responseCode of responseCodes) {
              if (!responseCode) continue;
              let responseCodeCountArray: number[] = [];
              for (const date of dates) {
                let item = data.find((item: any): boolean =>
                  (item.category === date && item.name === responseCode));
                responseCodeCountArray.push((item && item.dataPoint) || 0);
              }
              seriesData.push({ name: responseCode, data: responseCodeCountArray });
            }

            const formattedDates = dates.map((date: string): string => new Date(date).toLocaleDateString('en-GB'));

            this.responseCodesOverTimeChartSeries = seriesData;

            this.responseCodesOverTimeChartXAxis = {
              type: "categories",
              categories: formattedDates
            };

            this._cd.detectChanges();
          },
        }
      )
    );

    // Added to all pages
    this.alertService.getLatestAlerts();

    this._subscription.add(this.alertService.newLatestAlertsSubscription());

  }

  ngOnDestroy() {
    this.stopSubscriptions();
  }

  stopSubscriptions() {
    this._subscription.unsubscribe();
    this._networkMonitoringAnalytics.eventSource.close();
    this.alertService.eventSource.close();
  }

  onConnectorChange(newConnector: string) {
    this.selectedConnector = newConnector;
    this._networkMonitoringAnalytics.$selectedConnector.next(this.formatConnectorPath(newConnector));
    this._dashboardService.$selectedConnector.next(this.formatConnectorPath(this.selectedConnector));

    // Special treatment for the SSE endpoint
    // Close eventSource and re-open with Updated param
    this._networkMonitoringAnalytics.eventSource.close();
    this._networkMonitoringAnalytics.getHttpTransactionLatestEvents(this.formatConnectorPath(newConnector));
  }

  formatConnectorPath(connector: string) {
    return (connector == CONNECTOR_LIST.ALL_CONNECTORS) ? "" : connector;
  }

  initAppropriateGraph($event) {
    if ($event.index === 0) {
      this.transactionsTab = "Last 24 hours";
    } else {
      this.transactionsTab = "Last 30 days";
    }
  }

  latestEventsloaderStateUpdate(loading = false) {
    this.latestEventsLoading = loading;
  }
}

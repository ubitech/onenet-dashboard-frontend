import { Component, ViewChild } from "@angular/core";
import * as moment from "moment";
import { ChartComponent } from "ng-apexcharts";
import { Subscription } from "rxjs";
import { RouteService } from "src/app/core/services/route/route.service";
import { UserService } from "src/app/core/services/user/user.service";

@Component({
  selector: "app-market",
  templateUrl: "./market.component.html",
  styleUrls: ["./market.component.scss"],
})
export class MarketComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<any>;
  private _timeZone = "Europe/Athens";
  private _subscriptions = new Subscription();
  private _localeStringFormat = "M/DD/YYYY, H:mm:ss A";

  data = [
    {
      y: 100,
      x: "2022/3/13 00:00",
    },
    {
      y: 210,
      x: "2022/3/13 02:00",
    },
    {
      y: 250,
      x: "2022/3/13 04:00",
    },
    {
      y: 210,
      x: "2022/3/13 06:00",
    },
    {
      y: 260,
      x: "2022/3/13 08:00",
    },
    {
      y: 180,
      x: "2022/3/13 10:00",
    },
    {
      y: 290,
      x: "2022/3/13 12:00",
    },
    {
      y: 320,
      x: "2022/3/13 14:00",
    },
    {
      y: 340,
      x: "2022/3/13 16:00",
    },
    {
      y: 300,
      x: "2022/3/13 18:00",
    },
    {
      y: 230,
      x: "2022/3/13 20:00",
    },
    {
      y: 225,
      x: "2022/3/13 22:00",
    },
  ];

  constructor(
    private _routeService: RouteService,
    private _userService: UserService
  ) {
    this.chartOptions = {
      series: [],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      labels: {
        show: true,
      },
      legend: {
        show: false,
      },
      stroke: {
        curve: "stepline",
      },
      title: {
        text: "Day Ahead Prices",
        align: "left",
      },
      xaxis: {
        name: "Time",
        title: {
          text: "Time",
        },
        type: "category",
      },
      yaxis: {
        name: "Price per MTU [EUR / MWh]",
        title: {
          text: "Price per MTU [EUR / MWh]",
        },
      },
    };
  }

  ngOnInit() {
    this._routeService.market();
    this._subscriptions = this._userService
      .getTimezone()
      .subscribe((timeZone) => {
        this._timeZone = timeZone ? timeZone : this._timeZone;

        this.chartOptions.series = [
          {
            name: "Price per MTU [EUR / MWh]",
            data: this._mapResultsXaxisToTime(this.data),
          },
        ];
      });
  }

  //Uncomment if you want to add offset to the dates you get from backend
  //dates returned as UTC but date object always transforms them to local time
  //so we need to  transform them back to UTC and then to the timezone selected from user
  private _mapResultsXaxisToTime(data: { x: string; y: number }[]) {
    const returnedData = data?.map((el) => {
      // const offset = moment(el.x)?.utcOffset() / 60;
      // const UTCdate = moment(el.x)?.add(offset, "hours").utc().toDate();
      const localeDate = new Date(el.x)?.toLocaleString("en-US", {
        timeZone: this._timeZone,
      });
      const x = moment(localeDate, this._localeStringFormat).format("HH:mm");
      return {
        ...el,
        x,
      };
    });
    return returnedData;
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}

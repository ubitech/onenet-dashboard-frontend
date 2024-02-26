import { Component, OnInit } from "@angular/core";
import { BarChartOptions } from "src/app/shared/components/types/barChartOptions";
import { DashboardService } from "../../../services/dashboard.service";
import { ApexAxisChartSeries, ApexXAxis, ApexYAxis } from "ng-apexcharts";
import { Loader } from "src/app/shared/enums/loader";

@Component({
  selector: "app-anomaly-detection-graph",
  templateUrl: "./anomaly-detection-graph.component.html",
  styleUrls: ["./anomaly-detection-graph.component.scss"],
})
export class AnomalyDetectionGraphComponent implements OnInit {
  public timeframeList: string[] = ["20", "40", "60"];
  public selectedTimeframe: string = this.timeframeList[0];

  public anomalyDetectionChartOptions: BarChartOptions = {
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
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '16px',
        fontWeight: 900,
        colors: ["white"]
      }
    },
  };

  public anomalyDetectionChartYAxis: ApexYAxis = {
    labels: {
      // Add custom formatting to remove decimal points
      // since `decimalsInFloat: 0" and "floating: false` do not work
      formatter: (value) => { return parseInt((value || 0).toString()).toString() },
    },
  };

  public anomalyDetectionChartXAxis: ApexXAxis = {
    type: "category",
    categories: [],
  };

  public anomalyDetectionChartSeries: ApexAxisChartSeries = [
    {
      name: "Normal",
      data: [],
    },
    {
      name: "Anomalies",
      data: [],
    },
  ];

  public tooltip: any;

  public showGraph = false;
  anomaliesLoader = Loader.GET_ANOMALY_DETECTION_DATA;
  anomaliesLoading = false;

  constructor(private _dashboardService: DashboardService) {}

  ngOnInit(): void {
    this._dashboardService.getAnomalyDetectionDataObs.subscribe((res: any) => {
      // Reset first
      this.anomalyDetectionChartXAxis.categories = [];
      this.anomalyDetectionChartSeries[0].data = [];
      this.anomalyDetectionChartSeries[1].data = [];

      let dates: any = {};

      res.forEach((element) => {
        // If the timestamp does not exist, create a new column for it
        if (!(dates.hasOwnProperty(element.timestamp_from))) {
          dates[element.timestamp_from] = { normal: [], abnormal: [] }
          this.anomalyDetectionChartXAxis.categories.push(element.timestamp_from);
        }

        // Update the column by pushing the IP to the corresponding array (normal or abnormal)
        element.ip_status.forEach((isNormalInt: number, index: number) => {
          if (isNormalInt === 1) {
            dates[element.timestamp_from].normal.push(element.ip[index])
          }
          else {
            dates[element.timestamp_from].abnormal.push(element.ip[index])
          }
        })

      });

      // For every date, set the chart series data to the number of normal and abnormal clients
      for (let timestamp_from in dates) {
        let date = dates[timestamp_from];
        this.anomalyDetectionChartSeries[0].data.push(date.normal.length);
        this.anomalyDetectionChartSeries[1].data.push(date.abnormal.length);
      }

      let xAxisCategories: string[] = this.anomalyDetectionChartXAxis.categories;

      // Create custom tooltip
      this.tooltip = {
        custom: function ({ seriesIndex, dataPointIndex }) {
          return (
            '<div class="arrow_box">' +
            '<div class = "apexcharts-tooltip-title">' +
            "Distinct IPs:" +
            "</div>" +
            "<div style='padding:5px'>" +
            dates[xAxisCategories[dataPointIndex]][(seriesIndex === 0) ? "normal" : "abnormal"] +
            "</div>" +
            "</div>"
          );
        },
      };

      this.showGraph = true;
    });

    this._dashboardService.$selectedAnomalyDetectionTimeframe.next(this.selectedTimeframe);

    this._dashboardService.getAnomalyDetectionData();
  }

  // Reload data when a new timeframe is selected
  onTimeframeChange(newTimeframe: string) {
    this.selectedTimeframe = newTimeframe;
    this._dashboardService.$selectedAnomalyDetectionTimeframe.next(this.selectedTimeframe);
    console.log('newTimeframe =', newTimeframe)
  }
}

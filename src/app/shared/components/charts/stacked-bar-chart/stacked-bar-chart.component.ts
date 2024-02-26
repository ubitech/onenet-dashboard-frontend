import { Component, Input, ViewChild } from "@angular/core";
import { ApexAxisChartSeries, ApexXAxis, ChartComponent } from "ng-apexcharts";
import { BarChartOptions } from "../../types/barChartOptions";

@Component({
  selector: "app-stacked-bar-chart",
  templateUrl: "./stacked-bar-chart.component.html",
  styleUrls: ["./stacked-bar-chart.component.scss"],
})
export class StackedBarChartComponent {
  @Input() private inputSeries: any;
  @Input() private inputOptions: BarChartOptions;
  @Input() private colors: [];
  @Input() private title: string;
  @Input() private horizontal = true;
  @Input() private xaxis: ApexXAxis;
  @Input() private stacked = true;
  @ViewChild("chart", { static: false }) chart: ChartComponent;
  public chartOptions: Partial<any>;

  constructor() {
    this.chartOptions = {
      title: {
        text: "",
        align: "center",
        margin: 0,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "18px",
          fontWeight: "600",
          fontFamily: undefined,
          color: "#838286",
        },
      },
      series: [
        {
          data: [],
        },
      ],
      chart: {
        type: "bar",
        stacked: "true",
        height: '400px'
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [],
    };
  }
  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    this.chartOptions.series = [...this.inputSeries];
    this.chartOptions.colors = this.colors;
    this.chartOptions.title.text = this.title;
    this.chartOptions.plotOptions.bar.horizontal = this.horizontal;
    this.chartOptions = { ...this.chartOptions, ...this.inputOptions };
    this.chartOptions.chart.stacked = this.stacked;
    this.chartOptions.xaxis = { ...this.xaxis };
  }

  ngOnChanges(): void {
    this.createChart();
  }
}

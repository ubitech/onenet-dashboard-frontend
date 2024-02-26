import { Component, Input, ViewChild } from "@angular/core";
import { ApexXAxis, ApexYAxis, ChartComponent } from "ng-apexcharts";
import { BarChartOptions } from "../../types/barChartOptions";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.scss"],
})
export class BarChartComponent {
  @Input() inputSeries: any;
  @Input() inputOptions: BarChartOptions = {};
  @Input() title: string;
  @Input() horizontal = true;
  @Input() xaxis: ApexXAxis;
  @Input() yaxis: ApexYAxis;
  @Input() stacked = true;
  @Input() tooltip: any = {
    enabled: true,
  };
  @ViewChild("chart", { static: false }) chart: ChartComponent;
  public chartOptions: Partial<any>;

  constructor() {}

  ngOnChanges() {
    this.chartOptions = {
      colors: ["#053266", "#008013", "#9ea5a8"],
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
      series: [],
      chart: {
        type: "bar",
        stacked: this.stacked,
        height: "400px",
        animations: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: this.horizontal,
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: this.tooltip,
      responsive: [],
      ...this.inputOptions,
    };
  }
}

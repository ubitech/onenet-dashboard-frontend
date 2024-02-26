import { Component, Input, OnInit } from "@angular/core";
import { BarChartOptions } from "../../types/barChartOptions";

@Component({
  selector: "app-radial-bar-chart",
  templateUrl: "./radial-bar-chart.component.html",
  styleUrls: ["./radial-bar-chart.component.scss"],
})
export class RadialBarChartComponent {
  @Input() private inputSeries: any;
  @Input() private inputOptions: BarChartOptions;
  @Input() private colors: [];
  @Input() private title = '';
  public chartOptions: Partial<any>;

  constructor() {
    this.chartOptions = {
      title: {
        text: ''
      },
      chart: {
        type: "radialBar",
        offsetY: -20,
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: "97%",
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              opacity: 0.31,
              blur: 2,
            },
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: -2,
              fontSize: "22px",
            },
          },
        },
      },
      fill: {
        colors: ['#053266'],
        type: "gradient",
        gradient: {
          shade: "light",
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91],
        },
      },
      labels: ["Average Results"],
    };
  }

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    if (this.inputSeries && this.inputSeries.length) {
      this.chartOptions.series = [...this.inputSeries];
      this.chartOptions.fill.colors = [...this.chartOptions.fill.colors, this.colors];
      this.chartOptions.title.text = this.title;
      this.chartOptions = { ...this.chartOptions, ...this.inputOptions };
    }
  }

  ngOnChanges(): void {
    this.createChart();
  }
}

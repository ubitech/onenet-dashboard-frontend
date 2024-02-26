import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {ChartComponent} from 'ng-apexcharts';


@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnChanges {

  @Input() private chartData: {};
  @Input() private colors: [];
  @ViewChild('chart', {static: false}) chart: ChartComponent;
  public chartOptions: Partial<any>;

  constructor() {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'donut',
        width: '90%',
        offsetX: 12,
      },
      labels: [],
      fill: {
        colors: [],
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
          },
        },
      ],
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          expandOnClick: true,
          offsetX: 0,
          offsetY: 0,
          customScale: 1,
          total: {
            show: false,
            showAlways: false,
          },
          donut: {
            size: '80%',
            background: 'transparent',
            labels: {
              show: true,
              value: {
                show: true,
                fontSize: '32px',
                fontFamily: 'Objektiv Mk1',
                fontWeight: 500,
                color: '$my-app-primary',
              },
              name: {
                show: false,
              },
              total: {
                show: true,
                showAlways: true,
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
        fillSeriesColor: true,
        intercept: true,
        custom({series, seriesIndex, dataPointIndex, w}): string {
          const cssClass = `<div class="tooltip series${seriesIndex}">
        <span>
        ${w.config.labels[seriesIndex]}: <strong>${series[seriesIndex]}</strong>
        </span>
        </div>`;
          return cssClass;
        },
      },
    };
  }

  ngOnChanges(): void {
    if (Object.keys(this.chartData).length > 0) {
      this.chartOptions.series = [];
      for (const key of Object.keys(this.chartData)) {
        this.chartOptions.series.push(this.chartData[key]);
      }
      this.chartOptions.labels = this.chartData ? Object.keys(this.chartData) : [];
      this.chartOptions.fill.colors = this.colors;
      if (this.chart) {
        this.chart.updateOptions(this.chartOptions);
      }
    }
  }


}

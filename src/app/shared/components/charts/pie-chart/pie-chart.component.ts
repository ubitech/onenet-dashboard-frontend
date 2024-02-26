import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {ChartComponent} from 'ng-apexcharts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnChanges {

  @Input() private chartData: {};
  @Input() private colors: [];

  @ViewChild('chart', {static: false}) chart: ChartComponent;
  public chartOptions: Partial<any>;

  constructor() {
    this.chartOptions = {
      series: [],
      labels: [],
      fill: {
        colors: [],
      },
      chart: {
        type: 'pie',
        offsetX: 15
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 720,
          options: {
            dataLabels: {
              style: {
                fontSize: '14px',
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            dataLabels: {
              style: {
                fontSize: '18px',
              },
            },
          },
        },
      ],
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          expandOnClick: true,
          offsetX: -10,
          customScale: 0.88,
          dataLabels: {
            offset: 50,
          },
          donut: {
            labels: {
              total: {
                show: false,
                showAlways: false,
              },
            }
          }

        },
      },
      dataLabels: {
        style: {
          fontSize: '16px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: ['$my-app-primary'],
        },
        dropShadow: {
          enabled: false,
        },
      },
      tooltip: {
        enabled: true,
        fillSeriesColor: true,
        custom({series, seriesIndex, w}): string {
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

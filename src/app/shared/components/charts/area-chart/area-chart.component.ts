import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ChartComponent} from 'ng-apexcharts';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss']
})
export class AreaChartComponent implements OnInit, OnChanges {
  @Input() private inputSeries: any;
  @Input() private inputColors: [];
  @Input() private inputOptions: any;

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<any>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'CrimeReports',
          data: []
        },

      ],
      colors: ['rgba(239, 244, 246, 0.8)', 'rgba(0, 173, 238, 0.8)', 'rgba(130, 233, 255, 0.7)'],
      fill: {
        type: 'solid'
      },
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 0
      },
      xaxis: {},
      yaxis: {
        decimalsInFloat: 0
      },
      tooltip: {}
    };
  }

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    if (this.inputSeries && this.inputSeries[0].data.length > 0 && this.chartOptions.series[0].data.length === 0){
      this.chartOptions.series = this.inputSeries;

      this.chartOptions.fill.colors = this.inputColors;
      if (Object.keys(this.inputOptions).length > 0) {
        for (const key of Object.keys(this.inputOptions)) {
          this.chartOptions[key] = this.inputOptions[key];
        }
      }
      if (this.chart) {
        this.chart.updateOptions(this.chartOptions);
      }
    }
  }

  ngOnChanges(): void {
    this.createChart();
  }

}

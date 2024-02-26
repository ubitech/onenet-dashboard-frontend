import { Component, OnInit } from "@angular/core";
import { ApexAxisChartSeries } from "ng-apexcharts";
import { RouteService } from "src/app/core/services/route/route.service";
import { BarChartOptions } from "src/app/shared/components/types/barChartOptions";
import { DashboardService } from "../../services/dashboard.service";

@Component({
  selector: "app-energy-analytics",
  templateUrl: "./energy-analytics.component.html",
  styleUrls: ["./energy-analytics.component.scss"],
})
export class EnergyAnalyticsComponent implements OnInit {
  constructor(
    private routeService: RouteService,
  ) {}

  public energyAnalyticsChartSeries: ApexAxisChartSeries = [
    {
      name: "Data Monitoring Analytics",
      data: [
        10, 6, 8, 3, 5, 7, 11, 9, 15, 13, 10, 5, 16, 7, 8, 4, 9, 15, 14, 13, 11, 14, 6, 8
      ],
    },
  ];

  public energyAnalyticsChartOptions: BarChartOptions = {
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
  };

  public energyAnalyticsChartXAxis = {
    type: "categories",
    categories: [
      "01/06/2022",
      "02/06/2022",
      "03/06/2022",
      "04/06/2022",
      "05/06/2022",
      "06/06/2022",
      "07/06/2022",
      "08/06/2022",
      "09/06/2022",
      "10/06/2022",
      "11/06/2022",
      "12/06/2022",
      "13/06/2022",
      "14/06/2022",
      "15/06/2022",
      "16/06/2022",
      "17/06/2022",
      "18/06/2022",
      "19/06/2022",
      "20/06/2022",
      "21/06/2022",
      "22/06/2022",
      "23/06/2022",
      "24/06/2022",
    ],
  };

  ngOnInit(): void {
    this.routeService.energyAnalytics();
  }
}

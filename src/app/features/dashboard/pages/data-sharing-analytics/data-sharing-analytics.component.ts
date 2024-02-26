import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { RouteService } from "src/app/core/services/route/route.service";
import { EnumType } from "src/app/shared/interfaces/enum-type";

@Component({
  selector: "app-data-sharing-analytics",
  templateUrl: "./data-sharing-analytics.component.html",
  styleUrls: ["./data-sharing-analytics.component.scss"],
})
export class DataSharingAnalyticsComponent implements OnInit {
  public dropdownForm: FormGroup = this._fb.group({
    month: ["June", null],
  });
  //DUMMY DATA
  public months = ["April", "May", "June"];
  private dataPerMonth = {
    April: { producers: [10, 5, 6, 9, 3], consumers: [5, 3, 2, 5, 2] },
    May: { producers: [4, 3, 2, 9, 6], consumers: [4, 7, 6, 5, 8] },
    June: { producers: [6, 9, 5, 7, 11], consumers: [9, 5, 7, 2, 6] },
  };
  public registeredUsersXaxis = {
    type: "category",
    categories: ["16/6", "17/6", "18/6", "19/6", "20/6"],
  };
  public registeredUsersData = [
    {
      name: "Producers",
      data: this.dataPerMonth[this.dropdownForm.get("month").value]?.producers.map(
        (res,index) => ({
          x: this.registeredUsersXaxis.categories[index],
          y: res
        })
      )
    },
    {
      name: "Consumers",
      data: this.dataPerMonth[this.dropdownForm.get("month").value]?.consumers.map(
        (res,index) => ({
          x: this.registeredUsersXaxis.categories[index],
          y: res
        })
      )
    },
  ];



  public updateChart$ = new Subject<any>();
  constructor(
    private _routeService: RouteService,
    private _fb: FormBuilder,
    private _cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._routeService.dataSharingAnalytics();
  }

  public onChangeMonth(month: string) {
    this.registeredUsersData = [
      {
        name: "Producers",
        data: this.dataPerMonth[this.dropdownForm.get("month").value]
          ?.producers,
      },
      {
        name: "Consumers",
        data: this.dataPerMonth[this.dropdownForm.get("month").value]
          ?.consumers,
      },
    ];
  }
}

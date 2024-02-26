import { Component, OnInit } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { AlertService } from 'src/app/shared/services/alert.service';
import { Subscription } from "rxjs";

export interface ConnectorLastUsage {
  connector: string;
  timestamp: number;
}

@Component({
  selector: 'app-health-check',
  templateUrl: './health-check.component.html',
  styleUrls: ['./health-check.component.scss']
})
export class HealthCheckComponent implements OnInit {
  private _subscription = new Subscription();

  public connectorLastUsage: ConnectorLastUsage[] = [];
  public loading: boolean = true;

  constructor(
    private _dashboardService: DashboardService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this._dashboardService.getHealthCheckData();

    this._subscription.add(
      this._dashboardService.getHealthCheckDataObs.subscribe((res: any) => {
        this.connectorLastUsage = res
        this.loading = false
      })
    );

    // Added to all pages
    this.alertService.getLatestAlerts();

    this._subscription.add(this.alertService.newLatestAlertsSubscription());
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
    this.alertService.eventSource.close();
  }

  getHealth(ts: number): string {
    let now = Date.now()
    let diff = now - ts
    const dayInMilliseconds = 24 * 60 * 60 * 1000
    if (diff < 7 * dayInMilliseconds) {
      return "online"
    }
    else if (diff < 60 * dayInMilliseconds) {
      return "idle"
    }
    else {
      return "offline"
    }
  }

}

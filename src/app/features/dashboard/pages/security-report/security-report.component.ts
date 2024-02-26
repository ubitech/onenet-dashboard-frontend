import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { COUNTRY_MAPPING } from "../../../../shared/constants/countryMapping";
import { Loader } from "src/app/shared/enums/loader";
import { Subscription } from "rxjs";
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-security-report',
  templateUrl: './security-report.component.html',
  styleUrls: ['./security-report.component.scss']
})
export class SecurityReportComponent implements OnInit {
  private _subscription = new Subscription();
  securityReportLoader = Loader.GET_SECURITY_REPORT_DATA;
  loading: boolean = true;

  @Input() abnormalClients: any[] = []; // TODO: change any
  @Input() countryMapping: any = {}; // TODO: change any

  constructor(
    private _dashboardService: DashboardService,
    private alertService: AlertService,
    private _cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.countryMapping = COUNTRY_MAPPING;

    this._dashboardService.getSecurityReportData();

    this._subscription.add(
      this._dashboardService.getSecurityReportDataObs.subscribe((res: any) => {
        this.abnormalClients = res;
        this.loading = false;
        this._cd.detectChanges();
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

  downloadCsv() {
    // Construct CSV in the `content` variable
    const header = "IP Address,Country Code,Country,Hits,Errors,Errors (%)\n"
    let content = "data:text/csv;charset=utf-8,"+header
    for (const client of this.abnormalClients) {
      content=content+`${client.ip},${client.countryCode},"${this.countryMapping[client.countryCode.toUpperCase()]}",${client.hitsCount},${client.errorsCount},${(client.errorsCount * 100) / client.hitsCount}\n`
    }
    let encodedUri = encodeURI(content);

    // Use the hidden link method to trigger the download of the `content` variable as a CSV named "advanced-filtering.csv"
    let hiddenLink = document.createElement("a");
    hiddenLink.setAttribute("href", encodedUri);
    hiddenLink.setAttribute("download", "security-report.csv");
    document.body.appendChild(hiddenLink); // Required for FF
    hiddenLink.click();
  }

}

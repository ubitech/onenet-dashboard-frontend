import {NgModule} from '@angular/core';
import {SharedModule} from 'src/app/shared/shared.module';
import { EnergyAnalyticsComponent } from './pages/energy-analytics/energy-analytics.component';
import { MarketComponent } from './pages/market/market.component';
import { DataSharingAnalyticsComponent } from './pages/data-sharing-analytics/data-sharing-analytics.component';
import { NetworkMonitoringAnalyticsComponent } from './pages/network-monitoring-analytics/network-monitoring-analytics.component';
import { AnomalyDetectionGraphComponent } from './pages/network-monitoring-analytics/anomaly-detection-graph/anomaly-detection-graph.component';
import { SecurityReportComponent } from './pages/security-report/security-report.component';
import { AdvancedFilteringComponent } from './pages/advanced-filtering/advanced-filtering.component';
import { HealthCheckComponent } from './pages/health-check/health-check.component';


@NgModule({
  declarations: [
    NetworkMonitoringAnalyticsComponent,
    EnergyAnalyticsComponent,
    DataSharingAnalyticsComponent,
    MarketComponent,
    AnomalyDetectionGraphComponent,
    SecurityReportComponent,
    AdvancedFilteringComponent,
    HealthCheckComponent
  ],
  imports: [
    SharedModule,
  ],
})
export class DashboardModule {
}

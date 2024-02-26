import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';
import {LoginGuard} from './core/guards/login.guard';
import {ForgotPasswordPageComponent} from './features/auth/pages/forgot-password/forgot-password.page.component';
import {LoginPageComponent} from './features/auth/pages/login/login.page.component';
import {RegisterPageComponent} from './features/auth/pages/register/register.page.component';
import {ProfileComponent} from './features/profile/pages/profile.component';
import {ErrorComponent} from './features/error/error.component';
import {AuthComponent} from './features/auth/pages/auth/auth.component';
import { EnergyAnalyticsComponent } from './features/dashboard/pages/energy-analytics/energy-analytics.component';
import { DataSharingAnalyticsComponent } from './features/dashboard/pages/data-sharing-analytics/data-sharing-analytics.component';
import { NetworkMonitoringAnalyticsComponent } from './features/dashboard/pages/network-monitoring-analytics/network-monitoring-analytics.component';
import { SecurityReportComponent } from './features/dashboard/pages/security-report/security-report.component';
import { AdvancedFilteringComponent } from './features/dashboard/pages/advanced-filtering/advanced-filtering.component';
import { HealthCheckComponent } from './features/dashboard/pages/health-check/health-check.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'network-monitoring-analytics'},
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
      path: 'login',
        component: LoginPageComponent,
        canActivate: [LoginGuard],
      },
      {path: 'register', component: RegisterPageComponent},
      {path: 'forgot-password', component: ForgotPasswordPageComponent},
    ],
  },
  {path: 'network-monitoring-analytics', component: NetworkMonitoringAnalyticsComponent, canActivate: [AuthGuard]},
  {path: 'security-report', component: SecurityReportComponent, canActivate: [AuthGuard]},
  {path: 'energy-analytics', component: EnergyAnalyticsComponent, canActivate: [AuthGuard]},  
  // {path: 'data-sharing-analytics', component: DataSharingAnalyticsComponent, canActivate: [AuthGuard]},  
  {path: 'advanced-filtering', component: AdvancedFilteringComponent, canActivate: [AuthGuard]},
  {path: 'health-check', component: HealthCheckComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'error', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

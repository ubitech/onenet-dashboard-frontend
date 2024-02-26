import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from './features/auth/auth.module';
import {registerLocaleData} from '@angular/common';
import localeEl from '@angular/common/locales/el';
import {DashboardModule} from './features/dashboard/dashboard.module';
import {ProfileModule} from './features/profile/profile.module';
import {ErrorComponent} from './features/error/error.component';
import {MatPasswordStrengthModule} from '@angular-material-extensions/password-strength';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';

registerLocaleData(localeEl);

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    AuthModule,
    DashboardModule,
    ProfileModule,
    MatPasswordStrengthModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'el'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: [localStorage.getItem('dateFormat')? localStorage.getItem('dateFormat'): 'YYYY-MM-DD']
        },
        display: {
          dateInput: localStorage.getItem('dateFormat')? localStorage.getItem('dateFormat'): 'YYYY-MM-DD',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        }
      }
    }
    ],
  exports: [
    AppComponent
  ]
})
export class AppModule {

}

export function httpTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

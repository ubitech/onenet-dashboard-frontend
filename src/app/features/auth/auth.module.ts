import {NgModule} from '@angular/core';
import {AuthService} from './services/auth.service';
import {SharedModule} from 'src/app/shared/shared.module';
import {LoginPageComponent} from './pages/login/login.page.component';
import {RegisterPageComponent} from './pages/register/register.page.component';
import {ForgotPasswordPageComponent} from './pages/forgot-password/forgot-password.page.component';
import {AuthComponent} from './pages/auth/auth.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    ForgotPasswordPageComponent,
    AuthComponent
  ],
  providers: [
    AuthService
  ],
  imports: [
    SharedModule
  ]
})
export class AuthModule {
}

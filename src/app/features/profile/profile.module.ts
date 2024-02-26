import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {BasicInfoComponent} from './pages/basic-info/basic-info.component';
import {ProfileComponent} from './pages/profile.component';
import {AvatarComponent} from './pages/avatar/avatar.component';
import {TimeZoneComponent} from './pages/time-zone/time-zone.component';


@NgModule({
  declarations: [
    BasicInfoComponent,
    ProfileComponent,
    AvatarComponent,
    TimeZoneComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ProfileModule {
}

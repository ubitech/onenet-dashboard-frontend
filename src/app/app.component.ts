import {Component, OnInit} from '@angular/core';
import {MessageService} from './shared/services/message.service';
import {SnackBarService} from './shared/services/snack-bar.service';
import {AuthService} from './features/auth/services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import { UserService } from './core/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private snackBar: SnackBarService,
    private authService: AuthService,
    private translate: TranslateService,
    private userService: UserService) {

    translate.setDefaultLang('EN');
    translate.use('EN');
  }

  ngOnInit(): void {
    this.authService.setAuthenticatedUser();
    this.messageService.messageNotifier$.subscribe(
      (messages: any) => {
        this.snackBar.openSnackBar(messages[0]?.text, '', messages[0]?.type);
      }
    );
    this._setUserDateTime(); 

  }

  //if dateFormat exists in local storage give these values, otherwise give the values you get from user service
  private _setUserDateTime(): void {
    this.userService.getUser().subscribe(
      user => {
        this.userService.updateTimezone(user.timezone);
        this.userService.updateDateFormat(user.dateFormat);
      }
    )
  }
}


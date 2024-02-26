import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from 'src/app/features/auth/services/auth.service';
import {Action} from 'src/app/shared/enums/action';
import {Router} from '@angular/router';
import {UserService} from '../../../../core/services/user/user.service';
import {MessageService} from '../../../services/message.service';
import {LogService} from '../../../../core/services/log/log.service';
import { OnenetUser } from 'src/app/core/models/onenetUser';

@Component({
  selector: 'app-nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.scss']
})
export class NavToolbarComponent implements OnInit {
  cssProperties = {
    tooltip: {
      width: '12rem',
      top: '90%',
      right: '0',
      padding: '0.4em'
    },
    icon: {
      top: '0.3em',
      right: '3px'
    }
  };

  @Input() toolbarVisible = true;
  public toolbarActions = ['account', 'logout'];
  public user: OnenetUser;
  public source: string;

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private messageService: MessageService,
              private logger: LogService
  ) {
  }

  ngOnInit(): void {
    this.userService.getUser()
      .subscribe(user => {
          this.user = user;
          this.source = user.avatar ? '/assets/images/avatars/Frame-' + user.avatar + '.svg' : '/assets/images/avatars/no-avatar.svg';
        },
        error => {
          this.logger.error(error);
          // this.messageService.showMsg('Something went wrong on get user');
        });

  }

  public actionClick(eventData: { element: any, action: Action }): void {
    console.log(eventData);
    switch (eventData.action) {
      case Action.LOGOUT:
        this.authService.logout();
        break;
      case Action.ACCOUNT:
        this.router.navigate(['settings']);
        break;
    }
  }


}

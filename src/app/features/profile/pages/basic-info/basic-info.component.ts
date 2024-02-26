import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../../core/services/user/user.service';
import {User} from '../../../../core/models/user';
import {Router} from '@angular/router';
import {MessageService} from '../../../../shared/services/message.service';
import {LogService} from '../../../../core/services/log/log.service';
import { Message } from 'src/app/shared/interfaces/api-message';
import { OnenetUser } from 'src/app/core/models/onenetUser';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {

  public profileForm: FormGroup;
  public user: OnenetUser;

  public message = 'Profile Information of user. If you add more information about him you can display it here.';

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private messageService: MessageService,
              private logger: LogService) {
    this.userService.getUser()
      .subscribe(user => {
          this.user = user;
          this.profileForm = this.fb.group({
            email: [this.user.email],
            username: [this.user.username],
          });
        },
        error => {
          this.logger.error(error);
          this.messageService.showMsg([new Message('Something went wrong on get user')]);
        });
  }

  ngOnInit(): void {
  }

  navigateToKeycloak() {
    window.location.href = environment.KEYCLOAK_ACCOUNT_PAGE_URL;
  }

}

import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../core/services/user/user.service';
import {User} from '../../../core/models/user';
import {MessageService} from '../../../shared/services/message.service';
import { Message } from 'src/app/shared/interfaces/api-message';
import { OnenetUser } from 'src/app/core/models/onenetUser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: OnenetUser;
  source: string;
  subtitle: string;

  constructor(private userService: UserService,
              private messageService: MessageService) {

  }

  ngOnInit(): void {
    // this.userService.getUser()
    //   .subscribe(user => {
    //       this.user = user;
    //       this.subtitle = `${user.firstname ? user.firstname : 'No Firstname'} ${user.lastname ? user.lastname : 'No Lastname'}`;
    //       this.source = user.avatar ? '/assets/images/avatars/Frame-' + user.avatar + '.svg' : '/assets/images/avatars/no-avatar.svg';
    //     },
    //     error => {
    //       this.messageService.showMsg([new Message('Something went wrong on get user')]);
    //     });

  }

}

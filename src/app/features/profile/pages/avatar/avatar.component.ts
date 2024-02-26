import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../core/services/user/user.service';
import {MessageService} from '../../../../shared/services/message.service';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  state: number;
  message = 'Update Avatar. Connected with the backend.';

  constructor(private userService: UserService,
              private messageService: MessageService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  counter(i: number): any[] {
    return new Array(i);
  }

  updateAvatar(): void {
    this.userService.updateAvatar(this.state)
      .then(res => {
        return this.authService.refresh();
      })
      .then(res => {
        this.messageService.messageNotifier$.next([{text: 'Avatar update successfully', type: 'success'}]);
      })
      .catch(err => {
        this.messageService.messageNotifier$.next([{text: 'Something went wrong', type: 'error'}]);
      });
  }

}

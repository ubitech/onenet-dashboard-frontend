import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Message } from 'src/app/shared/interfaces/api-message';
import {MessageService} from 'src/app/shared/services/message.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.component.html',
  styleUrls: ['./forgot-password.page.component.scss', '../auth/auth.component.scss']
})
export class ForgotPasswordPageComponent implements OnInit {
  public form: FormGroup;
  errors = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
    });

  }

  async onSubmit(): Promise<void> {
    this.authService.forgotPassword(this.form.get('username').value)
      .toPromise()
      .then(res => {
        this.messageService.showMsg([new Message('A reset link has been send to your mail.', 'success')]);
      })
      .catch(err => {
        if (err.status === 404) {
          this.errors.push('Username not found');
        } else {
          this.messageService.showMsg([new Message('Something went wrong. Please try again later')]);
        }
      });
  }
}

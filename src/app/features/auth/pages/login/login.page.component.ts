import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {LogService} from '../../../../core/services/log/log.service';
import {MessageService} from '../../../../shared/services/message.service';
import {FormErrors} from 'src/app/shared/model/classes/form-errors.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.component.html',
  styleUrls: ['./login.page.component.scss', '../auth/auth.component.scss'],
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  public loginInvalid: boolean;
  authFormErrors = new FormErrors();
  errors = [];
  passwordError: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private log: LogService,
    private messageService: MessageService,
  ) {

  }

  ngOnInit(): void {

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.messageService.messageNotifier$.subscribe(
      messages => {
          this.authFormErrors.setBackendErrors(messages)
      }
    );

    this.form.valueChanges.subscribe(
      val => {
        this.authFormErrors.resetBackendErrors();
      }
    );

    this.authFormErrors.checkErrors$.subscribe(
      (errors) => {
        this.errors = errors;
      }
    );

  }

  public get checkUsernameError(): boolean {
    return (
      this.form.get('username').hasError('required') &&
      this.form.get('username').touched
    );
  }

  public get checkPasswordError(): boolean {
    return this.form.get('password').hasError('required') && this.form.get('password').touched;
  }

  public validate(): void {
    let requiredError = false;
    Object.keys(this.form.controls).forEach((ctrl) => {
      if (
        this.form.get(ctrl).hasError('required') &&
        this.form.get(ctrl).touched
      ) {
        this.authFormErrors.setUIError('required');
        requiredError = true;
      }
    });
    if (!requiredError) {
      this.authFormErrors.resetRequired();
    }
  }

  public onSubmit(): void {

    this.loginInvalid = false;
    if (this.form.valid) {

      const username = this.form.get('username').value;
      const password = this.form.get('password').value;

      this.authService.login(username, password)
        .subscribe(res => {
          this.log.info('Navigate to home page');
          this.router.navigate(['network-monitoring-analytics']);
        });
    }
  }


}

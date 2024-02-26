import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { LogService } from "src/app/core/services/log/log.service";
import { FormErrors } from "src/app/shared/model/classes/form-errors.class";
import { MessageService } from "src/app/shared/services/message.service";
import { UbiErrorStateMatcher } from "../../helpers/ubi-error-state-matcher";
import { checkPasswords } from "../../helpers/validators";
import { RegisterUser } from "../../models/register-user";
import { AuthService } from "../../services/auth.service";
import { InputOptions } from "../../../../shared/model/input-options";
import { RadioValue } from "../../../../shared/model/radio-value";
import { Role } from "../../enums/role";
import { Subscription } from "rxjs";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.component.html",
  styleUrls: ["./register.page.component.scss", "../auth/auth.component.scss"],
})
export class RegisterPageComponent implements OnInit {
  public form: FormGroup;
  matcher = new UbiErrorStateMatcher();
  passwordForm: FormGroup;
  public Role = Role;
  errors = [];
  formErrors = new FormErrors();
  options: InputOptions = {
    required: true,
    error: false,
  };
  buttons: RadioValue[] = [
    {
      id: Role.CONSUMER,
      description: "consumer",
      selected: true,
    },
  ];
  private _subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private log: LogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.passwordForm = new FormGroup(
      {
        password: new FormControl("", [Validators.required]),
        confirmPassword: new FormControl(""),
      },
      checkPasswords
    );

    this.form = this.fb.group({
      username: ["", Validators.required],
      email: [
        "",
        [
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      passwords: this.passwordForm,
      role: [Role.CONSUMER, Validators.required],
    });

    this._subscriptions.add(
      this.messageService.messageNotifier$.subscribe((messages) => {
        this.formErrors.setBackendErrors(messages);
      })
    );

    this._subscriptions.add(
      this.form.valueChanges.subscribe((val) => {
        this.formErrors.resetBackendErrors();
      })
    );

    this.formErrors.checkErrors$.subscribe((errors) => {
      this.errors = errors;
    });
  }

  public validateUsername(): void {
    this.checkFormForRequiredError();
  }

  public validateEmail(): void {
    this.checkFormForRequiredError();
    if (this.form.get("email").hasError("pattern")) {
      this.formErrors.setUIError("email");
    } else {
      this.formErrors.resetEmail();
    }
  }

  public validatePassword(ctrl: string): void {
    const passwordsGroup = this.form.get("passwords");

    this.formErrors.resetMinLength();
    this.formErrors.resetNotSame();

    this.checkFormForRequiredError();

    if (passwordsGroup.hasError("notSame")) {
      this.formErrors.setUIError("notSame");
      return;
    }

    if (passwordsGroup.hasError("minlength")) {
      this.formErrors.setUIError("minlength");
      return;
    }
  }

  private checkFormForRequiredError(): void {
    let requiredError = false;
    Object.keys(this.form.controls).forEach((ctrl) => {
      if (ctrl === "passwords") {
        if (
          (this.form.get(ctrl).get("password").hasError("required") &&
            this.form.get(ctrl).get("password").touched) ||
          (this.form.get(ctrl).get("confirmPassword").hasError("required") &&
            this.form.get(ctrl).get("confirmPassword").touched)
        ) {
          this.formErrors.setUIError("required");
          requiredError = true;
          return;
        }
      }
      if (
        this.form.get(ctrl).hasError("required") &&
        this.form.get(ctrl).touched
      ) {
        this.formErrors.setUIError("required");
        requiredError = true;
      }
    });
    if (!requiredError) {
      this.formErrors.resetRequired();
    }
  }

  get checkUsernameError(): boolean {
    return (
      this.form.get("username").hasError("required") &&
      this.form.get("username").touched
    );
  }

  get checkEmailErrors(): boolean {
    return this.form.get("email").invalid && this.form.get("email").touched;
  }

  get checkPasswordErrors(): boolean {
    const passwordsGroup = this.form.get("passwords");
    return (
      passwordsGroup.hasError("notSame") || passwordsGroup.hasError("minlength")
    );
  }

  get checkPasswordRequiredError(): boolean {
    return (
      this.form.get("passwords").get("password").touched &&
      this.form.get("passwords").get("password").invalid
    );
  }

  get checkConfirmPasswordRequiredError(): boolean {
    return (
      this.form.get("passwords").get("confirmPassword").touched &&
      this.form.get("passwords").get("confirmPassword").invalid
    );
  }

  public onSubmit(): void {
    const { username, passwords, email, role } = this.form.value;
    const { password, confirmPassword } = passwords;
    const newUser = new RegisterUser(
      username,
      password,
      confirmPassword,
      email,
      [role]
    );

    this.authService.register(newUser).subscribe((res) => {
      this.router.navigate(["/auth/login"]);
    });
  }

  ngOnDestroy() {
    this.formErrors.checkErrors$.unsubscribe();
    this._subscriptions.unsubscribe();
  }
}

import {Subject} from 'rxjs';
import { Message } from '../../interfaces/api-message';

export class FormErrors {

  private required = {msg: 'all-fields-required', exists: false};
  private email = {msg: 'email-valid', exists: false};
  private notSame = {msg: 'matching-password-rule', exists: false};
  private minlength = {msg: 'password-size-error', exists: false};
  private errors = [];
  private backEnd = {messages: [], exists: false};
  public checkErrors$ = new Subject<string[]>();

  public getErrors(): any[] {
    return this.errors;
  }

  public setBackendErrors(messages: Message[]): void {
    this.backEnd = {exists: true, messages};
    this.checkErrors$.next(this.toArray());
  }

  public setUIError(errorType: string): void {
    if (!this[errorType]) {
      return;
    }
    this.resetBackendErrors();
    this[errorType].exists = true;
    this.checkErrors$.next(this.toArray());
  }

  public resetUIErrors(): void {
    this.resetRequired();
    this.resetEmail();
    this.resetNotSame();
    this.resetMinLength();
    this.checkErrors$.next(this.toArray());
  }

  public resetBackendErrors(): void {
    this.backEnd.exists = false;
    this.backEnd.messages = [];
    this.checkErrors$.next(this.toArray());
  }

  public resetRequired(): void {
    this.required.exists = false;
    this.checkErrors$.next(this.toArray());
  }

  public resetEmail(): void {
    this.email.exists = false;
    this.checkErrors$.next(this.toArray());
  }

  public resetNotSame(): void {
    this.notSame.exists = false;
    this.checkErrors$.next(this.toArray());
  }

  public resetMinLength(): void {
    this.minlength.exists = false;
    this.checkErrors$.next(this.toArray());
  }

  private toArray(): string[] {
    let arr = [];
    if (this.required.exists) {
      arr = [this.required.msg];
    }
    if (this.email.exists) {
      arr = [...arr, this.email.msg];
    }
    if (this.notSame.exists) {
      arr = [...arr, this.notSame.msg];
    }
    if (this.minlength.exists) {
      arr = [...arr, this.minlength.msg];
    }
    if (this.backEnd.exists) {
      arr = [...arr, ...this.backEnd.messages];
    }
    return [...arr];
  }
}

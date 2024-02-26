import {FormGroup} from '@angular/forms';

export const checkPasswords = (group: FormGroup) => {
  const password = group.get('password');
  const confirmPassword = group.get('confirmPassword');
  if (
    password.pristine || confirmPassword.pristine ||
    (
      password.value.length === 0 ||
      confirmPassword.value.length === 0)) {
    return;
  }
  if (password.value !== confirmPassword.value) {
    return {notSame: true};
  }
  if (password.value.length > 0 && password.value.length < 4) {
    return {minlength: true};
  }
  return null;
};

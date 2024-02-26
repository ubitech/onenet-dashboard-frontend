import {Component, Input, OnInit, Output, EventEmitter, ViewChild, ChangeDetectorRef} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputOptions} from '../../../model/input-options';
import {
  MatPassToggleVisibilityComponent,
  MatPasswordStrengthComponent
} from '@angular-material-extensions/password-strength';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent {
  @Input() controlName = '';
  @Input() label = '';
  @Input() formGroup: FormGroup;
  @Input() customStyle: { [key: string]: string };
  @Input() toggleVisibility: false;
  @Input() passwordStrength: false;
  @Input() hadGroup: false;
  @Input('options') inputOptions: InputOptions;
  options = {
    required: false,
    error: false,
    disabled: false,
    placeholder: '********',
    clearBtn: true,
    appearance: 'none'
  };
  strength = 0;
  @ViewChild('passwordComponent') passwordComponent: MatPasswordStrengthComponent = new MatPasswordStrengthComponent();
  @ViewChild('toggle') toggle: MatPassToggleVisibilityComponent;
  @Output() passwordComponentEvent = new EventEmitter<MatPasswordStrengthComponent>();
  @Output() onClearInput = new EventEmitter();

  constructor() {
    if (this.passwordStrength) {
      this.passwordComponentEvent.emit(this.passwordComponent);
    }
  }

  onStrengthChanged(strength: number): void {
    if (strength !== this.strength) {
      this.strength = strength;
      this.passwordComponentEvent.emit(this.passwordComponent);
    }
  }

  ngOnChanges(): void {
    this.inputOptions = {...this.options, ...this.inputOptions}
    console.log(this.label);
  }

  clearInput(): void {
    this.formGroup.controls[this.controlName].patchValue('');
    this.onClearInput.emit()
  }

}

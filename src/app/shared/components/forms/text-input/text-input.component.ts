import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputOptions} from '../../../model/input-options';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent {
  @Input() controlName = '';
  @Input() label = '';
  @Input() type = 'text';
  @Input() formGroup: FormGroup;
  @Input() customStyle: { [key: string]: string };
  @Output() onClearInput = new EventEmitter();
  // @Input() clearBtn = true

  @Input('options') inputOptions: InputOptions;

  options: InputOptions = {
    required: false,
    error: false,
    disabled: false,
    clearBtn: true
  };

  ngOnChanges(): void {
    this.inputOptions = {...this.options, ...this.inputOptions};
    console.log(this.label);
  }

  clearInput(): void {
    this.formGroup.controls[this.controlName].patchValue('');
    this.onClearInput.emit()
  }

}

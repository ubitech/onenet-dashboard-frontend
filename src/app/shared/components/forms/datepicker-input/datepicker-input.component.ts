import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputOptions} from '../../../model/input-options';

@Component({
  selector: 'app-datepicker-input',
  templateUrl: './datepicker-input.component.html',
  styleUrls: ['./datepicker-input.component.scss']
})
export class DatepickerInputComponent {
  @Input() maxDate= new Date();
  @Input() minDate= new Date(0,0,1);
  @Input() controlName = '';
  @Input() label = '';
  @Input() formGroup: FormGroup;
  @Input() customStyle: { [key: string]: string };
  @Input() options: InputOptions = {
    required: false,
    error: false,
  };

  constructor() {
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DropdownValue} from '../../../model/dropdown-value';
import {RadioValue} from '../../../model/radio-value';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {

  @Input() controlName = '';
  @Input() formGroup: FormGroup;
  @Input() label = '';
  @Input() returnValue = '';
  @Input() buttons: RadioValue[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}

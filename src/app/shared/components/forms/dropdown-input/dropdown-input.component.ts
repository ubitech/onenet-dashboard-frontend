import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputOptions} from '../../../model/input-options';
import {DropdownValue} from '../../../model/dropdown-value';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-dropdown-input',
  templateUrl: './dropdown-input.component.html',
  styleUrls: ['./dropdown-input.component.scss']
})
export class DropdownInputComponent implements OnInit {
  @Input() controlName = '';
  @Input() label = '';
  @Input() multiple = false;
  @Input() formGroup: FormGroup;
  @Input() options: InputOptions = {
    required: false,
    error: false,
  };
  @Input() customStyle: { [key: string]: string };
  @Input() values: DropdownValue[] = [];
  @Input() selected: DropdownValue[] = [];
  @Input() optionLabel: string;
  @Input() allValue = false;
  @Output() changeSelection = new EventEmitter<string |number>()
  constructor() {
  }

  ngOnInit(): void {
  }

  public onChangeSelection(event: MatSelectChange) {
    this.changeSelection.emit(event.value);
  }



}

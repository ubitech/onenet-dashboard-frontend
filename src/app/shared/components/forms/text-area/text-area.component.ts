import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputOptions} from '../../../model/input-options';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {

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

  ngOnInit(): void {
  }

}

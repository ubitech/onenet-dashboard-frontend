import {Component, Input} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent extends FormControl {
  @Input() controlName = '';
  @Input() formGroup: FormGroup;
  @Input() customStyle: { [key: string]: string };

  constructor() {
    super();
  }

}

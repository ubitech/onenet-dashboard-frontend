import {FormGroup} from '@angular/forms';

export interface DialogData {
  title: string;
  formGroup: FormGroup;
  values: { [index: string]: any[] };
  location?: [];
  locationForm? : FormGroup;
  multipleChoice?: { [index: string]: boolean };
}

import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from '../../../interfaces/dialog-data.interface';


@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
})
export class FormModalComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormModalComponent>,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.form = this.data.formGroup;
  }


  ngOnInit(): void {
  }

  public closeDialog(save = false): void {
    if (save) {
      this.dialogRef.close({form: this.form, title: this.data.title });
    } else {
      this.dialogRef.close(save);
    }
  }
}

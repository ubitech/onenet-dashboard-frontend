import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/interfaces/dialog-data.interface';

@Component({
  selector: 'app-files-modal',
  templateUrl: './files-modal.component.html',
  styleUrls: ['./files-modal.component.scss']
})
export class FilesModalComponent implements OnInit {

  public form: FormGroup;
  public files = ['file1', 'file2', 'file3', 'file4']
  constructor(
    public dialogRef: MatDialogRef<FilesModalComponent>,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
  }


  ngOnInit(): void {
    this.form = this.fb.group({
      file: [''],
    });
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  public uploadFile(): void {
    console.log('upload file');
  }

  public closeDialog(save = false): void {
      this.dialogRef.close(save);
  }
}

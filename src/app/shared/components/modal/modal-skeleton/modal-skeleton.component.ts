import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-skeleton',
  templateUrl: './modal-skeleton.component.html',
  styleUrls: ['./modal-skeleton.component.scss']
})
export class ModalSkeletonComponent implements OnInit {

  @Input() title: string;
  @Input() dialogRef: MatDialogRef<any>;

  constructor() {
  }

  ngOnInit(): void {
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  checked = false;
  @Output() onClick = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {

  }

  click(): void {
    this.checked = !this.checked;
    this.onClick.emit(this.checked);
  }

}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss']
})
export class SlideToggleComponent implements OnInit {

  @Input() label = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}

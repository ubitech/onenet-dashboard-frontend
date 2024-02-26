import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-square-card',
  templateUrl: './square-card.component.html',
  styleUrls: ['./square-card.component.scss']
})
export class SquareCardComponent implements OnInit {


  @Input() title;
  @Input() subtitle;
  @Input() footer;


  constructor() {
  }

  ngOnInit(): void {
  }

}

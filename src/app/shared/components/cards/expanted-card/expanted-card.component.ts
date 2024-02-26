import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-expanted-card',
  templateUrl: './expanted-card.component.html',
  styleUrls: ['./expanted-card.component.scss']
})
export class ExpantedCardComponent implements OnInit {

  @Input() title;
  @Input() subtitle;
  @Input() footer;

  constructor() {
  }

  ngOnInit(): void {
  }

}

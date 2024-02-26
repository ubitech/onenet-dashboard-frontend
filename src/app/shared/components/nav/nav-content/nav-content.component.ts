import {Component, Input, OnInit} from '@angular/core';
import {Nav} from '../../../model/nav';

@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent implements OnInit {
  @Input() items: Nav[];

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.items);
  }

}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-path',
  templateUrl: './page-path.component.html',
  styleUrls: ['./page-path.component.scss']
})
export class PagePathComponent implements OnInit {

  @Input() path = '';
  @Input() innerPath = '';
  @Input() routerPath = '';

  constructor() {
    console.log(this.routerPath);
  }

  ngOnInit(): void {
    console.log(this.routerPath);
  }

}

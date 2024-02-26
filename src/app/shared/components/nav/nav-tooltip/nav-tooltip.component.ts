import {Component, Input, OnInit} from '@angular/core';
import {Nav} from '../../../model/nav';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-tooltip',
  templateUrl: './nav-tooltip.component.html',
  styleUrls: ['./nav-tooltip.component.scss'],
})
export class NavTooltipComponent implements OnInit {
  @Input() item: Nav;
  public selected = false;
  public selectedChildren = [];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (this.item && this.item.content && this.item.content[0] && this.item.content[0].subchildren) {
      this.selectedChildren = Array(this.item.content[0].subchildren.length).fill(false);
    }
  }

  public toggleContent(show = true): void {
    this.selected = show;
  }

  public toggleSubContent(show = true, childIndex: number): void {
    this.selectedChildren[childIndex] = show;
  }

}

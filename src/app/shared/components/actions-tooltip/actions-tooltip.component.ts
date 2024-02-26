import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Action, toAction} from '../../enums/action';

@Component({
  selector: 'app-actions-tooltip',
  templateUrl: './actions-tooltip.component.html',
  styleUrls: ['./actions-tooltip.component.scss']
})
export class ActionsTooltipComponent implements OnInit {
  @Input() cssProperties = {tooltip: {width: '8rem'}, icon: {}};
  @Input() arrowShow = true;
  @Input() language = false;
  @Input() icon = 'bx bx-menu';
  @Input() element = null;
  @Input() showTooltip = false;
  @Input() actions = [Action.EDIT, Action.DELETE];

  @Output() onClickAction = new EventEmitter<{ element: any, action: string }>();

  constructor() {
  }

  ngOnInit(): void {
  }

  public clickMenu(): void {
    this.showTooltip = !this.showTooltip;
  }

  public clickAction(action: Action): void {
    action = toAction(action);
    this.onClickAction.emit({element: this.element, action});
  }
}

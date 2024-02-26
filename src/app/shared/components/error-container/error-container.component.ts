import {animate, state, style, transition, trigger} from '@angular/animations';
import {Component, Input} from '@angular/core';
import { Message } from '../../interfaces/api-message';

@Component({
  selector: 'app-error-container',
  templateUrl: './error-container.component.html',
  styleUrls: ['./error-container.component.scss'],
  animations: [
    trigger(
      'showHideAnimation', [
        transition(':enter', [
          style({opacity: 0}),
          animate('300ms', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('100ms', style({opacity: 0}))
        ])
      ]
    )
  ],
})
export class ErrorContainerComponent {

  @Input() errors: Message[];

  constructor() {
  }
}

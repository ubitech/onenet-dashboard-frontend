import {animate, state, style, transition, trigger} from '@angular/animations';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Nav} from '../../model/nav';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    trigger('openClose', [
      state('opened', style({
        width: '15em'
      })),
      state('closed', style({
        width: '7em'
      })),
      transition('opened => closed', [
        animate('0.2s')
      ]),
      transition('closed => opened', [
        animate('0.3s')
      ]),
    ]),
    trigger('marginContent', [
      state('opened', style({
        marginLeft: '15em'
      })),
      state('closed', style({
        marginLeft: '7em'
      })),
      transition('opened => closed', [
        animate('0.2s')
      ]),
      transition('closed => opened', [
        animate('0.3s')
      ]),
    ]),
    trigger(
      'enterAnimation', [
        state('hidden', style({
          opacity: 0
        })),
        state('shown', style({
          opacity: 1
        })),
        transition('hidden => shown', [
          animate('300ms', style({opacity: 1}))
        ]),
        transition('shown => hidden', [
          animate('100ms', style({opacity: 0}))
        ])
      ]
    )

  ],
})
export class NavComponent implements OnInit {

  expanded = false;
  selected = false;
  events: string[] = [];
  opened = true;
  shouldRun = true;
  hideIcon = false;
  navItems: Nav[];
  logoImg = '../../../../assets/icons/logo-big.png';
  logoImgWidth = "60";

  constructor(public router: Router) {
  }

  get headerVisible(): boolean {
    return this.router.url.indexOf('login') < 0 &&
      this.router.url.indexOf('register') < 0 &&
      this.router.url.indexOf('error') < 0 &&
      this.router.url.indexOf('forgot-password') < 0;
  }

  ngOnInit(): void {
    this.navItems = [
      {
        label: 'Network Monitoring Analytics',
        content: [],
        icon: 'bx-bar-chart',

        hidden: true,
        url: 'network-monitoring-analytics',
      },
      {
        label: 'Security Report',
        content: [],
        icon: 'bx-shield-quarter',
        hidden: true,
        url: 'security-report'
      },
      {
        label: 'Health Check',
        content: [],
        icon: 'bx-pulse',
        hidden: true,
        url: 'health-check',
      },
      {
        label: 'Advanced Filtering',
        content: [],
        icon: 'bx-filter',
        hidden: true,
        url: 'advanced-filtering',
      },
     
    ];
  }

  public expandNav(): void {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.logoImg = '../../../../assets/icons/logo-big.png';
      this.logoImgWidth = "200";
      return;
    }
    this.logoImgWidth = "60";
  }

  public toggleTooltip(name: string, hidden: boolean): void {
    this.navItems.map((item) => {
      if (item.label === name) {
        item.hidden = hidden;
      }
    });
  }

}

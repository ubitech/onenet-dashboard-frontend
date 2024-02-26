import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  status = '';
  description = '';

  constructor(private router: Router) {
    this.status = this.router.getCurrentNavigation().extras.state.status;
    this.description = this.router.getCurrentNavigation().extras.state.description;
  }

  ngOnInit(): void {
  }

}

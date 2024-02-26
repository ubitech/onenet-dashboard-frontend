import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-simple-search-filter',
  templateUrl: './simple-search-filter.component.html',
  styleUrls: ['./simple-search-filter.component.scss']
})
export class SimpleSearchFilterComponent implements OnInit, OnDestroy {

  @Output() onFilterChange = new EventEmitter<any>();
  filterForm: FormGroup;
  subscription = new Subscription();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      filter: [null, null],
    });

  }

  public filter(): void {
    this.onFilterChange.emit(this.filterForm.get('filter').value);
  }

  public reset(): void {
    this.onFilterChange.emit('');
    this.filterForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

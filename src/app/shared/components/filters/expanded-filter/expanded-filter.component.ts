import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import { Subscription} from 'rxjs';


@Component({
  selector: 'app-expanded-filter',
  templateUrl: './expanded-filter.component.html',
  styleUrls: ['./expanded-filter.component.scss'],
})
export class ExpandedFilterComponent implements OnInit, OnDestroy {
  @Input() inputs = [
    {
      name: 'lastname',
      ctrl: 'lastName',
      type: 'text',
      values: [],
    },
    {
      name: 'gender',
      ctrl: 'gender',
      type: 'dropdown',
      values: [{id: 'MALE', description: 'Male'}, {id: 'FEMALE', description: 'Female'}],
    },
    {
      name: 'birthDate.from',
      ctrl: 'birthDateFrom',
      type: 'date',
      values: [],
    },
    {
      name: 'birthDate.to',
      ctrl: 'birthDateTo',
      type: 'date',
      values: [],
    },
  ];
  @Output() onFilterChange = new EventEmitter<any>();
  filterForm: FormGroup;
  subscription = new Subscription();

  //DATE LIMITS
  defaultMinDate = new Date(1900,0,1);
  defaultMaxDate = new Date()

  min = {
    birthDateFrom: this.defaultMinDate,
    birthDateTo: this.defaultMinDate,
  }

  max = {
    birthDateFrom: this.defaultMaxDate,
    birthDateTo: this.defaultMaxDate,
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    const formGroup = this.inputs.reduce((prev, curr) => {
      const ctrls = {...prev, [curr.ctrl]: [null, null]};
      return ctrls;
    }, {});
    this.filterForm = this.fb.group(formGroup);

    this.filterForm.get('birthDateFrom').valueChanges.subscribe(val => {
      if(!val) {
        this.min.birthDateTo = this.defaultMinDate
        return;
      }
      if(this.filterForm.get('birthDateTo').value) {
        this.min.birthDateTo = val
        return;
      }
      this.min.birthDateTo = val;
    })
    this.filterForm.get('birthDateTo').valueChanges.subscribe(
      val => {
        //toDate has not value
        if(!val) {
          this.max.birthDateFrom = this.defaultMaxDate
          return;
        }
        //fromDate has value
        if(this.filterForm.get('birthDateFrom').value)  {
          this.max.birthDateFrom = val
          return;
        }
        //toDate and fromDate dont have value
        this.min.birthDateFrom = val;
      }
    )
  }

  public filter(): void {
    console.log(this.filterForm.value);
    this.onFilterChange.emit({
      filter: this.filterForm.value,
      filterPredicate: this.filterPredicate,
    });
  }

  private checkDates(
    filterDate: moment.Moment,
    dateStr: string,
    fromTo: string
  ): boolean {
    if (!dateStr) {
      return false;
    }
    let result = true;
    const date = moment(dateStr);
    console.log(date);
    // TODO: Maybe not optimal
    if (fromTo.indexOf('From') > -1) {
      // result = filterDate <= date;
      result = filterDate.isSameOrBefore(date);
      return result;
    }
    result = filterDate.isSameOrAfter(date);
    return result;
  }

  private filterPredicate(element: any, filter: any): boolean {
    let result = true;

    Object.keys(filter).forEach((key) => {
      // There is a dateElement key in filter
      // to distinct
      // updateTimestamp in Crime reports and
      // birthDate in Persons
      if (!result || key === 'dateElement') {
        return;
      }
      const filterValue = filter[key];
      const isDate = moment.isMoment(filterValue);

      // if is not date and filter[key] is null
      if (!isDate && !filterValue) {
        return;
      }

      //  if date
      if (isDate) {
        // TODO: Not generic, fix it
        result = ExpandedFilterComponent.prototype.checkDates(
          filterValue,
          element[filter.dateElement],
          key
        );
        return;
      }
      // if filter exists but element is null
      if (!element[key] && element[key] !== 0) {
        result = false;
        return;
      }
      // if dropdown( gender )
      if (typeof filter[key] === 'object') {
        // dont show empty fields
        if (!element[key].description) {
          return false;
        }
        result =
          filterValue
            .map((val) => val.toLowerCase())
            .indexOf(element[key].description.toLowerCase()) > -1;
        return;
      }
      // if number
      if (typeof element[key] === 'number') {
        result = element[key] === Number(filterValue);
        return;
      }

      // if string
      result =
        element[key].toLowerCase().indexOf(filterValue.toLowerCase()) > -1;
    });
    return result;
  }

  public reset(): void {
    this.onFilterChange.emit('');
    this.filterForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

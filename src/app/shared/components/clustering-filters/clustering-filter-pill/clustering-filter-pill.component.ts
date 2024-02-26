import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-clustering-filter-pill',
  templateUrl: './clustering-filter-pill.component.html',
  styleUrls: ['./clustering-filter-pill.component.scss']
})
export class ClusteringFilterPillComponent implements OnInit {
  @Input() filterText = '';
  @Input() filterState = false;
  @Output() onChangeFilter = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  changeState(): void {
    this.onChangeFilter.emit(this.filterText)
  }
}

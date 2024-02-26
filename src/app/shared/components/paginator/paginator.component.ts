import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges, OnInit {
  @Input() pageOptions = [5, 10, 25, 50, 100];
  @Input() pageSize = 10;
  @Input() length;
  @Input() tableData: any[] = [];
  @Input() filteredData: any[] = [];
  @Input() pageResetting: Subject<boolean> = new Subject<boolean>();
  @Output() nextPage = new EventEmitter<number>();
  @Output() previousPage = new EventEmitter<number>();
  @Output() selectPageOption = new EventEmitter<number>();
  @Output() updateTable = new EventEmitter<any>();
  private page = 0;
  fromPage = 0;
  toPage = this.pageSize;
  isOptionSelected = false;
  rowsPerPage = this.pageSize;

  constructor() {
  }

  ngOnInit(): void {
    // RESET PAGINATOR FROM OUTSIDE THE COMPONENT
    this.pageResetting.subscribe(_ => this.resetPage());
  }

  get manualPaging(): boolean {
    return this.tableData && this.tableData.length > 0;
  }

  ngOnChanges(): void {
    this.resetPage();
    if (this.manualPaging) {
      this.length = this.filteredData.length > 0 ? this.filteredData.length : this.tableData.length;
      this.onUpdateTable();
    }
    if(!this.length) {
      this.fromPage = 0;
      this.toPage = 0;
      return;
    }
    if (this.length <= this.rowsPerPage * (this.page + 1)) {
      this.toPage = this.length;
    }
  }

  public onNextPage(): void {
    this.page = ++this.page;
    this.changePageShown();
    this.nextPage.emit(this.page);
  }

  public onPreviousPage(): void {
    this.page = --this.page;
    this.changePageShown();
    this.previousPage.emit(this.page);
  }

  // FOR MANUAL PAGINATION
  private onUpdateTable(): void {
    let tableData = this.tableData;
    if (this.filteredData.length > 0) {
      tableData = this.filteredData;
    }
    const updatedData = tableData? tableData.slice(
      this.page * this.rowsPerPage,
      this.rowsPerPage * (this.page + 1)) : [];
    this.updateTable.emit(updatedData);
  }

  public changePageShown(): void {
    this.fromPage = this.page !== 0 ? this.rowsPerPage * this.page + 1 : 1;
    this.toPage =
      this.rowsPerPage * (this.page + 1) <= this.length
        ? this.rowsPerPage * (this.page + 1)
        : this.length;
    if (this.manualPaging) {
      this.onUpdateTable();
    }
  }

  // SELECT INPUT FUNCTION
  onOptionsClick(): void {
    this.isOptionSelected = !this.isOptionSelected;
  }

  onOptionSelect(option: number): void {
    // RESET PAGE
    this.rowsPerPage = option;
    this.resetPage();

    this.selectPageOption.emit(option);
    if (this.manualPaging) {
      this.onUpdateTable();
    }
    // CLOSE SELECT INPUT DROPDOWN
    this.isOptionSelected = false;
  }

  public resetPage(): void {
    this.page = 0;
    this.fromPage = 1;
    if (this.tableData?.length && this.rowsPerPage > this.tableData?.length) {
      this.toPage = this.length;
    } else {
      this.toPage = this.rowsPerPage * (this.page + 1);
    }
    this.onUpdateTable();
  }
}

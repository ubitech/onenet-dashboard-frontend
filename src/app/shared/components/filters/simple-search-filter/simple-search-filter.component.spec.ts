import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SimpleSearchFilterComponent} from './simple-search-filter.component';

describe('SimpleSearchFilterComponent', () => {
  let component: SimpleSearchFilterComponent;
  let fixture: ComponentFixture<SimpleSearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimpleSearchFilterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

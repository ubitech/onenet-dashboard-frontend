import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExpandedFilterComponent} from './expanded-filter.component';

describe('ExpandedFilterComponent', () => {
  let component: ExpandedFilterComponent;
  let fixture: ComponentFixture<ExpandedFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpandedFilterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandedFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

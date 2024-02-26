import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedFilteringComponent } from './advanced-filtering.component';

describe('AdvancedFilteringComponent', () => {
  let component: AdvancedFilteringComponent;
  let fixture: ComponentFixture<AdvancedFilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedFilteringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

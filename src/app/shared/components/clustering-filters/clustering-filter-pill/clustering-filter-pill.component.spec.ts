import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusteringFilterPillComponent } from './clustering-filter-pill.component';

describe('ClusteringFilterPillComponent', () => {
  let component: ClusteringFilterPillComponent;
  let fixture: ComponentFixture<ClusteringFilterPillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusteringFilterPillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusteringFilterPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

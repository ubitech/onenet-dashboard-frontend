import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClusteringFiltersComponent } from './clustering-filters.component';


describe('ClusteringFilters', () => {
  let component: ClusteringFiltersComponent;
  let fixture: ComponentFixture<ClusteringFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusteringFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusteringFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

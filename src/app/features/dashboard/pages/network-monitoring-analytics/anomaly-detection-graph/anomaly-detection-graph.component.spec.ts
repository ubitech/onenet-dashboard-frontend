import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomalyDetectionGraphComponent } from './anomaly-detection-graph.component';

describe('AnomalyDetectionGraphComponent', () => {
  let component: AnomalyDetectionGraphComponent;
  let fixture: ComponentFixture<AnomalyDetectionGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnomalyDetectionGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnomalyDetectionGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

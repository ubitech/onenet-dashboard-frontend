import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadialBarChartComponent } from './radial-bar-chart.component';

describe('RadialBarChartComponent', () => {
  let component: RadialBarChartComponent;
  let fixture: ComponentFixture<RadialBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadialBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadialBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

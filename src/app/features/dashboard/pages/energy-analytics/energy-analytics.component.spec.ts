import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyAnalyticsComponent } from './energy-analytics.component';

describe('EnergyAnalyticsComponent', () => {
  let component: EnergyAnalyticsComponent;
  let fixture: ComponentFixture<EnergyAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergyAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

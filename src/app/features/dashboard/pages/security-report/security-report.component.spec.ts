import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityReportComponent } from './security-report.component';

describe('SecurityReportComponent', () => {
  let component: SecurityReportComponent;
  let fixture: ComponentFixture<SecurityReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

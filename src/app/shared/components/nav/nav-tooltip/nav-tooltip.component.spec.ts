import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavTooltipComponent} from './nav-tooltip.component';

describe('NavTooltipComponent', () => {
  let component: NavTooltipComponent;
  let fixture: ComponentFixture<NavTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavTooltipComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ActionsTooltipComponent} from './actions-tooltip.component';

describe('ActionsTooltipComponent', () => {
  let component: ActionsTooltipComponent;
  let fixture: ComponentFixture<ActionsTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionsTooltipComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

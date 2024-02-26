import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExpantedCardComponent} from './expanted-card.component';

describe('ExpantedCardComponent', () => {
  let component: ExpantedCardComponent;
  let fixture: ComponentFixture<ExpantedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpantedCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpantedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

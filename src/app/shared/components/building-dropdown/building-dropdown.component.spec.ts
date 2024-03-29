import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingDropdownComponent } from './building-dropdown.component';

describe('BuildingDropdownComponent', () => {
  let component: BuildingDropdownComponent;
  let fixture: ComponentFixture<BuildingDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

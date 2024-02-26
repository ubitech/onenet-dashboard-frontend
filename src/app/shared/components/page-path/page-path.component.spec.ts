import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PagePathComponent} from './page-path.component';

describe('PagePathComponent', () => {
  let component: PagePathComponent;
  let fixture: ComponentFixture<PagePathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagePathComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

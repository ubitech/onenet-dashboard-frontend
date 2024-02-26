import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalSkeletonComponent} from './modal-skeleton.component';

describe('ModalSkeletonComponent', () => {
  let component: ModalSkeletonComponent;
  let fixture: ComponentFixture<ModalSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalSkeletonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

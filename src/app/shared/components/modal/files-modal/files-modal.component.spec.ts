import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesModalComponent } from './files-modal.component';

describe('FilesModalComponent', () => {
  let component: FilesModalComponent;
  let fixture: ComponentFixture<FilesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

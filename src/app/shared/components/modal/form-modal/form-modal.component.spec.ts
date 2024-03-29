import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormModalComponent} from './form-modal.component';


describe('DialogContainerComponent', () => {
  let component: FormModalComponent;
  let fixture: ComponentFixture<FormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

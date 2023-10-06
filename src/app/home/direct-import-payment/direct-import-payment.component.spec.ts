import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectImportPaymentComponent } from './direct-import-payment.component';

describe('DirectImportPaymentComponent', () => {
  let component: DirectImportPaymentComponent;
  let fixture: ComponentFixture<DirectImportPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectImportPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectImportPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAcceptanceLetterComponent } from './payment-acceptance-letter.component';

describe('PaymentAcceptanceLetterComponent', () => {
  let component: PaymentAcceptanceLetterComponent;
  let fixture: ComponentFixture<PaymentAcceptanceLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentAcceptanceLetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAcceptanceLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

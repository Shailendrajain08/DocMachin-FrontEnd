import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeRequestLetterComponent } from './trade-request-letter.component';

describe('TradeRequestLetterComponent', () => {
  let component: TradeRequestLetterComponent;
  let fixture: ComponentFixture<TradeRequestLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeRequestLetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeRequestLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

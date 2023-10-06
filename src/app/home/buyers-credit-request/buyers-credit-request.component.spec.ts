import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyersCreditRequestComponent } from './buyers-credit-request.component';

describe('BuyersCreditRequestComponent', () => {
  let component: BuyersCreditRequestComponent;
  let fixture: ComponentFixture<BuyersCreditRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyersCreditRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyersCreditRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

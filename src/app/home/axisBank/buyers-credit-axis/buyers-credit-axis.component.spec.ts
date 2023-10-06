import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyersCreditAxisComponent } from './buyers-credit-axis.component';

describe('BuyersCreditAxisComponent', () => {
  let component: BuyersCreditAxisComponent;
  let fixture: ComponentFixture<BuyersCreditAxisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyersCreditAxisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyersCreditAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

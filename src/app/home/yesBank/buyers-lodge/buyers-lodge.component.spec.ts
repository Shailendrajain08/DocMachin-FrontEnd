import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyersLodgeComponent } from './buyers-lodge.component';

describe('BuyersLodgeComponent', () => {
  let component: BuyersLodgeComponent;
  let fixture: ComponentFixture<BuyersLodgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyersLodgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyersLodgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

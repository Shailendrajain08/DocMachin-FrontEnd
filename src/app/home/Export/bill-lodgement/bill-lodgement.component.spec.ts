import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillLodgementComponent } from './bill-lodgement.component';

describe('BillLodgementComponent', () => {
  let component: BillLodgementComponent;
  let fixture: ComponentFixture<BillLodgementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillLodgementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillLodgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

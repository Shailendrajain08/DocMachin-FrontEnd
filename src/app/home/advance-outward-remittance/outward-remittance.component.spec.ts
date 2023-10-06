import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutwardRemittanceComponent } from './outward-remittance.component';

describe('OutwardRemittanceComponent', () => {
  let component: OutwardRemittanceComponent;
  let fixture: ComponentFixture<OutwardRemittanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutwardRemittanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutwardRemittanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

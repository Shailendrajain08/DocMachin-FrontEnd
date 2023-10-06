import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardRemittanceComponent } from './inwardRemittance.component';

describe('AxisbankComponent', () => {
  let component: InwardRemittanceComponent;
  let fixture: ComponentFixture<InwardRemittanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InwardRemittanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InwardRemittanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

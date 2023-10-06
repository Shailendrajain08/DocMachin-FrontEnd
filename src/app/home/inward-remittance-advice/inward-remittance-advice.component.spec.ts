import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardRemittanceAdviceComponent } from './inward-remittance-advice.component';

describe('InwardRemittanceAdviceComponent', () => {
  let component: InwardRemittanceAdviceComponent;
  let fixture: ComponentFixture<InwardRemittanceAdviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InwardRemittanceAdviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InwardRemittanceAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

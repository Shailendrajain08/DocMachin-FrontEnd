import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardRemittanceBoeComponent } from './inward-remittance-boe.component';

describe('InwardRemittanceBoeComponent', () => {
  let component: InwardRemittanceBoeComponent;
  let fixture: ComponentFixture<InwardRemittanceBoeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InwardRemittanceBoeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InwardRemittanceBoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { A2cumApplicationYesBankComponent } from './a2cum-application-yes-bank.component';

describe('A2cumApplicationYesBankComponent', () => {
  let component: A2cumApplicationYesBankComponent;
  let fixture: ComponentFixture<A2cumApplicationYesBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ A2cumApplicationYesBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(A2cumApplicationYesBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

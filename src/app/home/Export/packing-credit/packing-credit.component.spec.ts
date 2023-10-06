import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingCreditComponent } from './packing-credit.component';

describe('PackingCreditComponent', () => {
  let component: PackingCreditComponent;
  let fixture: ComponentFixture<PackingCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackingCreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

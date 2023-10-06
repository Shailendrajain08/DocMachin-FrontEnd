import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutwardRemComponent } from './outward-rem.component';

describe('OutwardRemComponent', () => {
  let component: OutwardRemComponent;
  let fixture: ComponentFixture<OutwardRemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutwardRemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutwardRemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

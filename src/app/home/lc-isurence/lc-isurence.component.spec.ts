import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LcIsuranceComponent } from './lc-isurance.component';

describe('LcIsuranceComponent', () => {
  let component: LcIsuranceComponent;
  let fixture: ComponentFixture<LcIsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LcIsuranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LcIsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDfLibComponent } from './pdf-lib.component';

describe('PDfLibComponent', () => {
  let component: PDfLibComponent;
  let fixture: ComponentFixture<PDfLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PDfLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PDfLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

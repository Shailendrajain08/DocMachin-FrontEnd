import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionReportsComponent } from './opinion-reports.component';

describe('OpinionReportsComponent', () => {
  let component: OpinionReportsComponent;
  let fixture: ComponentFixture<OpinionReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpinionReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinionReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

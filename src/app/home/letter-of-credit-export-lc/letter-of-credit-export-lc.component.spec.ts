import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterOfCreditExportLCComponent } from './letter-of-credit-export-lc.component';

describe('LetterOfCreditExportLCComponent', () => {
  let component: LetterOfCreditExportLCComponent;
  let fixture: ComponentFixture<LetterOfCreditExportLCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetterOfCreditExportLCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterOfCreditExportLCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

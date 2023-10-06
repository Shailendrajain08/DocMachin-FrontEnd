import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterOfCreditImportComponent } from './letter-of-credit-import.component';

describe('LetterOfCreditImportComponent', () => {
  let component: LetterOfCreditImportComponent;
  let fixture: ComponentFixture<LetterOfCreditImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetterOfCreditImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterOfCreditImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

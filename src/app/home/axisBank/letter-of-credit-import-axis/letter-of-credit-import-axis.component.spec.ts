import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterOfCreditImportAxisComponent } from './letter-of-credit-import-axis.component';

describe('LetterOfCreditImportAxisComponent', () => {
  let component: LetterOfCreditImportAxisComponent;
  let fixture: ComponentFixture<LetterOfCreditImportAxisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetterOfCreditImportAxisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterOfCreditImportAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

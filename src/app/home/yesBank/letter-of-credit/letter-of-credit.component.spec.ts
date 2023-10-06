import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterOfCreditComponent } from './letter-of-credit.component';

describe('LetterOfCreditComponent', () => {
  let component: LetterOfCreditComponent;
  let fixture: ComponentFixture<LetterOfCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetterOfCreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterOfCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDebitNoteComponent } from './import-debit-note.component';

describe('ImportDebitNoteComponent', () => {
  let component: ImportDebitNoteComponent;
  let fixture: ComponentFixture<ImportDebitNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportDebitNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportDebitNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

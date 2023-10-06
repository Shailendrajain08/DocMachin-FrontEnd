import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportsCreditNoteComponent } from './imports-credit-note.component';

describe('ImportsCreditNoteComponent', () => {
  let component: ImportsCreditNoteComponent;
  let fixture: ComponentFixture<ImportsCreditNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportsCreditNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportsCreditNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

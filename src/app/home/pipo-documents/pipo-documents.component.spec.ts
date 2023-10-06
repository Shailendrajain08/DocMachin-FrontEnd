import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipoDocumentsComponent } from './pipo-documents.component';

describe('PipoDocumentsComponent', () => {
  let component: PipoDocumentsComponent;
  let fixture: ComponentFixture<PipoDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipoDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipoDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

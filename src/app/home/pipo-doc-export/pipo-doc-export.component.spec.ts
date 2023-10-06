import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipoDocExportComponent } from './pipo-doc-export.component';

describe('PipoDocExportComponent', () => {
  let component: PipoDocExportComponent;
  let fixture: ComponentFixture<PipoDocExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipoDocExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipoDocExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

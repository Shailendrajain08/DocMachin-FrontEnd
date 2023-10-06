import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedExportComponent } from './completed-export.component';

describe('CompletedExportComponent', () => {
  let component: CompletedExportComponent;
  let fixture: ComponentFixture<CompletedExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

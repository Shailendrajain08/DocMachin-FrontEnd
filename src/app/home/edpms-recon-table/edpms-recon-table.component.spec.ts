import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdpmsReconTableComponent } from './edpms-recon-table.component';

describe('EdpmsReconTableComponent', () => {
  let component: EdpmsReconTableComponent;
  let fixture: ComponentFixture<EdpmsReconTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdpmsReconTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdpmsReconTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdpmsReconComponent } from './edpms-recon.component';

describe('EdpmsReconComponent', () => {
  let component: EdpmsReconComponent;
  let fixture: ComponentFixture<EdpmsReconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdpmsReconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdpmsReconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportInsuranceComponent } from './import-insurance.component';

describe('ImportInsuranceComponent', () => {
  let component: ImportInsuranceComponent;
  let fixture: ComponentFixture<ImportInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportInsuranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

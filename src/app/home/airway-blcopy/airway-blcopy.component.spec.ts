import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirwayBLCopyComponent } from './airway-blcopy.component';

describe('AirwayBLCopyComponent', () => {
  let component: AirwayBLCopyComponent;
  let fixture: ComponentFixture<AirwayBLCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirwayBLCopyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirwayBLCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

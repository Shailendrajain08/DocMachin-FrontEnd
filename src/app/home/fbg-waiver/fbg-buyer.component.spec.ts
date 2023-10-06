import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbgBuyerComponent } from './fbg-buyer.component';

describe('FbgBuyerComponent', () => {
  let component: FbgBuyerComponent;
  let fixture: ComponentFixture<FbgBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbgBuyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FbgBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

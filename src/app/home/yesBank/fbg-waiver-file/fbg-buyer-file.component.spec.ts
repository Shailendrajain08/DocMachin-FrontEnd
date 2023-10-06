import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbgBuyerFileComponent } from './fbg-buyer-file.component';

describe('FbgBuyerFileComponent', () => {
  let component: FbgBuyerFileComponent;
  let fixture: ComponentFixture<FbgBuyerFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbgBuyerFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FbgBuyerFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

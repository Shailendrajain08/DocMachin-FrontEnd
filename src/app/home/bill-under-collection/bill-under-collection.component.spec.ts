import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillUnderCollectionComponent } from './bill-under-collection.component';

describe('BillUnderCollectionComponent', () => {
  let component: BillUnderCollectionComponent;
  let fixture: ComponentFixture<BillUnderCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillUnderCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillUnderCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBeneComponent } from './edit-bene.component';

describe('EditBeneComponent', () => {
  let component: EditBeneComponent;
  let fixture: ComponentFixture<EditBeneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBeneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBeneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

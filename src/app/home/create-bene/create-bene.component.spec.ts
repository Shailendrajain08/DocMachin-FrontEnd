import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBeneComponent } from './create-bene.component';

describe('CreateBeneComponent', () => {
  let component: CreateBeneComponent;
  let fixture: ComponentFixture<CreateBeneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBeneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBeneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

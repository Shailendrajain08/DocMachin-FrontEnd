import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPipoComponent } from './add-pipo.component';

describe('AddPipoComponent', () => {
  let component: AddPipoComponent;
  let fixture: ComponentFixture<AddPipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

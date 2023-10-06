import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPipoComponent } from './edit-pipo.component';

describe('EditPipoComponent', () => {
  let component: EditPipoComponent;
  let fixture: ComponentFixture<EditPipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { A2cumAplicationComponent } from './a2cum-aplication.component';

describe('A2cumAplicationComponent', () => {
  let component: A2cumAplicationComponent;
  let fixture: ComponentFixture<A2cumAplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ A2cumAplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(A2cumAplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

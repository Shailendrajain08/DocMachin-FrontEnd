import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardRemmitanceComponent } from './inward-remmitance.component';

describe('InwardRemmitanceComponent', () => {
  let component: InwardRemmitanceComponent;
  let fixture: ComponentFixture<InwardRemmitanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InwardRemmitanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InwardRemmitanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

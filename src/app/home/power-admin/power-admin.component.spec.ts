import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerAdminComponent } from './power-admin.component';

describe('PowerAdminComponent', () => {
  let component: PowerAdminComponent;
  let fixture: ComponentFixture<PowerAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

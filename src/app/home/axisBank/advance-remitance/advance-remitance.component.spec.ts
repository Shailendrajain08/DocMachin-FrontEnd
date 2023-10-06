import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceRemitanceComponent } from './advance-remitance.component';

describe('AdvanceRemitanceComponent', () => {
  let component: AdvanceRemitanceComponent;
  let fixture: ComponentFixture<AdvanceRemitanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvanceRemitanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceRemitanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

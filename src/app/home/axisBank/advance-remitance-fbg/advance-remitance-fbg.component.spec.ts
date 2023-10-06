import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceRemitanceFbgComponent } from './advance-remitance-fbg.component';

describe('AdvanceRemitanceFbgComponent', () => {
  let component: AdvanceRemitanceFbgComponent;
  let fixture: ComponentFixture<AdvanceRemitanceFbgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvanceRemitanceFbgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceRemitanceFbgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

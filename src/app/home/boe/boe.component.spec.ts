import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BOEComponent } from './boe.component';

describe('BOEComponent', () => {
  let component: BOEComponent;
  let fixture: ComponentFixture<BOEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BOEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BOEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

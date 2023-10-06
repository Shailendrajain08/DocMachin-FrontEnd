import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardRemmitancep0103Component } from './inward-remmitancep0103.component';

describe('InwardRemmitancep0103Component', () => {
  let component: InwardRemmitancep0103Component;
  let fixture: ComponentFixture<InwardRemmitancep0103Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InwardRemmitancep0103Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InwardRemmitancep0103Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

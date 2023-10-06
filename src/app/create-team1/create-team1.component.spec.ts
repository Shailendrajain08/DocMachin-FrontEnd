import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeam1Component } from './create-team1.component';

describe('CreateTeam1Component', () => {
  let component: CreateTeam1Component;
  let fixture: ComponentFixture<CreateTeam1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTeam1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeam1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

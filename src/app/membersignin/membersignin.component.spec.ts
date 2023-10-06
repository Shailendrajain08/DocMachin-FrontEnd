import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersigninComponent } from './membersignin.component';

describe('MembersigninComponent', () => {
  let component: MembersigninComponent;
  let fixture: ComponentFixture<MembersigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersigninComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

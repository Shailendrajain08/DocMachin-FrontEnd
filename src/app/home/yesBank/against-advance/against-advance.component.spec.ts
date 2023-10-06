import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgainstAdvanceComponent } from './against-advance.component';

describe('AgainstAdvanceComponent', () => {
  let component: AgainstAdvanceComponent;
  let fixture: ComponentFixture<AgainstAdvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgainstAdvanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgainstAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

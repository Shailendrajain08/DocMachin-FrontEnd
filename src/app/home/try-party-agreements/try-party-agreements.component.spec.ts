import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TryPartyAgreementsComponent } from './try-party-agreements.component';

describe('TryPartyAgreementsComponent', () => {
  let component: TryPartyAgreementsComponent;
  let fixture: ComponentFixture<TryPartyAgreementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TryPartyAgreementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TryPartyAgreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

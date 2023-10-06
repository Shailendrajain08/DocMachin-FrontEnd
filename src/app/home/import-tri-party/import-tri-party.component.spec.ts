import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTriPartyComponent } from './import-tri-party.component';

describe('ImportTriPartyComponent', () => {
  let component: ImportTriPartyComponent;
  let fixture: ComponentFixture<ImportTriPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportTriPartyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTriPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

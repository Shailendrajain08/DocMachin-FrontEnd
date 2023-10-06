import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipoNewComponent } from './pipo-new.component';

describe('PipoNewComponent', () => {
  let component: PipoNewComponent;
  let fixture: ComponentFixture<PipoNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipoNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

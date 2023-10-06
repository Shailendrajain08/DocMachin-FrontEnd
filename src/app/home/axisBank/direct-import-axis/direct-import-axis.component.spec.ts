import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectImportAxisComponent } from './direct-import-axis.component';

describe('DirectImportAxisComponent', () => {
  let component: DirectImportAxisComponent;
  let fixture: ComponentFixture<DirectImportAxisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectImportAxisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectImportAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

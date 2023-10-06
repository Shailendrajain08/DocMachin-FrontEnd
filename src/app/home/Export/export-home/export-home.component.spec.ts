import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportHomeComponent } from './export-home.component';

describe('ExportHomeComponent', () => {
  let component: ExportHomeComponent;
  let fixture: ComponentFixture<ExportHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

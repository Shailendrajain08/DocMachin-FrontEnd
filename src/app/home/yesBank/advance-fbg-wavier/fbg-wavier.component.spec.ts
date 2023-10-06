import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbgWavierComponent } from './fbg-wavier.component';

describe('FbgWavierComponent', () => {
  let component: FbgWavierComponent;
  let fixture: ComponentFixture<FbgWavierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbgWavierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FbgWavierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

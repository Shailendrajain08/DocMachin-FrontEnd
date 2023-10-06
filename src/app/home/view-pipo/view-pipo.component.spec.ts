import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPipoComponent } from './view-pipo.component';



describe('ViewPipoComponent', () => {
  let component: ViewPipoComponent;
  let fixture: ComponentFixture<ViewPipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

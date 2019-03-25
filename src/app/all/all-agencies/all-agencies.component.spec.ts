import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AllAgenciesComponent } from './all-agencies.component';
describe('AllAgenciesComponent', () => {
  let component: AllAgenciesComponent;
  let fixture: ComponentFixture<AllAgenciesComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllAgenciesComponent]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AllAgenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

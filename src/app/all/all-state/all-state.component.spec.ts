import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AllStateComponent } from './all-state.component';
describe('AllStateComponent', () => {
  let component: AllStateComponent;
  let fixture: ComponentFixture<AllStateComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllStateComponent]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AllStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

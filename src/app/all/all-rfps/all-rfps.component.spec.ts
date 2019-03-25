import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AllRfpsComponent } from './all-rfps.component';
describe('AllRfpsComponent', () => {
  let component: AllRfpsComponent;
  let fixture: ComponentFixture<AllRfpsComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllRfpsComponent]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AllRfpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

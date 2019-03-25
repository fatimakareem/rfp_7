import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateRfpComponent } from './state-rfp.component';

describe('StateRfpComponent', () => {
  let component: StateRfpComponent;
  let fixture: ComponentFixture<StateRfpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateRfpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateRfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

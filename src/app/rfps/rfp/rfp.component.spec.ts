import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfpComponent } from './rfp.component';

describe('RfpComponent', () => {
  let component: RfpComponent;
  let fixture: ComponentFixture<RfpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

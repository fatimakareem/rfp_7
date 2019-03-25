import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyRfpComponent } from './agency-rfp.component';

describe('AgencyRfpComponent', () => {
  let component: AgencyRfpComponent;
  let fixture: ComponentFixture<AgencyRfpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyRfpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyRfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

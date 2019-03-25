import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupersiderbarComponent } from './supersiderbar.component';

describe('SupersiderbarComponent', () => {
  let component: SupersiderbarComponent;
  let fixture: ComponentFixture<SupersiderbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupersiderbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupersiderbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

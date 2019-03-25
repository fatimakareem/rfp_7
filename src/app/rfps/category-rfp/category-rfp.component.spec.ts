import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryRfpComponent } from './category-rfp.component';

describe('CategoryRfpComponent', () => {
  let component: CategoryRfpComponent;
  let fixture: ComponentFixture<CategoryRfpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryRfpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryRfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

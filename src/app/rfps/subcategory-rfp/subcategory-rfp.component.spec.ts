import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryRfpComponent } from './subcategory-rfp.component';

describe('SubcategoryRfpComponent', () => {
  let component: SubcategoryRfpComponent;
  let fixture: ComponentFixture<SubcategoryRfpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoryRfpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryRfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

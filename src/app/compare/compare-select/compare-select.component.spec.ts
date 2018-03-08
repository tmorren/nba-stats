import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareSelectComponent } from './compare-select.component';

describe('CompareSelectComponent', () => {
  let component: CompareSelectComponent;
  let fixture: ComponentFixture<CompareSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

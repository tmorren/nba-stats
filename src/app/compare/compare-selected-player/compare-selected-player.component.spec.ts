import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareSelectedPlayerComponent } from './compare-selected-player.component';

describe('CompareSelectedPlayerComponent', () => {
  let component: CompareSelectedPlayerComponent;
  let fixture: ComponentFixture<CompareSelectedPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareSelectedPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareSelectedPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

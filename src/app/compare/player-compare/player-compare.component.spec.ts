import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCompareComponent } from './player-compare.component';

describe('PlayerCompareComponent', () => {
  let component: PlayerCompareComponent;
  let fixture: ComponentFixture<PlayerCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

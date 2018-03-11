import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListDateComponent } from './game-list-date.component';

describe('GameListDateComponent', () => {
  let component: GameListDateComponent;
  let fixture: ComponentFixture<GameListDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameListDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameListDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

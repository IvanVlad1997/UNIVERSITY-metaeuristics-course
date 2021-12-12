import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Problema3HillClimbingComponent } from './problema3-hill-climbing.component';

describe('Problema3HillClimbingComponent', () => {
  let component: Problema3HillClimbingComponent;
  let fixture: ComponentFixture<Problema3HillClimbingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Problema3HillClimbingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Problema3HillClimbingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

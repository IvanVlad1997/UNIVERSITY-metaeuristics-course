import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Problema3IronAnnealingComponent } from './problema3-iron-annealing.component';

describe('Problema3IronAnnealingComponent', () => {
  let component: Problema3IronAnnealingComponent;
  let fixture: ComponentFixture<Problema3IronAnnealingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Problema3IronAnnealingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Problema3IronAnnealingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

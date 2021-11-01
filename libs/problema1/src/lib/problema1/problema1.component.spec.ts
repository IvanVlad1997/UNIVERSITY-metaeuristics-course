import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Problema1Component } from './problema1.component';

describe('Problema1Component', () => {
  let component: Problema1Component;
  let fixture: ComponentFixture<Problema1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Problema1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Problema1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

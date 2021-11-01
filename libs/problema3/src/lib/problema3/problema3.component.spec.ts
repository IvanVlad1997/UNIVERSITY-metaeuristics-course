import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Problema3Component } from './problema3.component';

describe('Problema3Component', () => {
  let component: Problema3Component;
  let fixture: ComponentFixture<Problema3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Problema3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Problema3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

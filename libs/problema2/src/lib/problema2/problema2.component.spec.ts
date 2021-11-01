import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Problema2Component } from './problema2.component';

describe('Problema2Component', () => {
  let component: Problema2Component;
  let fixture: ComponentFixture<Problema2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Problema2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Problema2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

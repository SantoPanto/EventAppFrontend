import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eventservice } from './eventservice';

describe('Eventservice', () => {
  let component: Eventservice;
  let fixture: ComponentFixture<Eventservice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Eventservice],
    }).compileComponents();

    fixture = TestBed.createComponent(Eventservice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

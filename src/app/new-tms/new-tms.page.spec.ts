import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTMSPage } from './new-tms.page';

describe('NewTMSPage', () => {
  let component: NewTMSPage;
  let fixture: ComponentFixture<NewTMSPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTMSPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTMSPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

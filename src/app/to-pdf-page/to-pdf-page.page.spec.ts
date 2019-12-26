import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToPDFPagePage } from './to-pdf-page.page';

describe('ToPDFPagePage', () => {
  let component: ToPDFPagePage;
  let fixture: ComponentFixture<ToPDFPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToPDFPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToPDFPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

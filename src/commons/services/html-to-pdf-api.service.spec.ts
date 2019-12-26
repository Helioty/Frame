import { TestBed } from '@angular/core/testing';

import { HTMLToPDFAPIService } from './html-to-pdf-api.service';

describe('HTMLToPDFAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HTMLToPDFAPIService = TestBed.get(HTMLToPDFAPIService);
    expect(service).toBeTruthy();
  });
});

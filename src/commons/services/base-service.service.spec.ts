import { TestBed } from '@angular/core/testing';

import { BaseServiceService } from './base-service.service';

describe('BaseServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseServiceService = TestBed.get(BaseServiceService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ForecastsService } from './forecasts.service';

describe('ForecastsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForecastsService = TestBed.get(ForecastsService);
    expect(service).toBeTruthy();
  });
});

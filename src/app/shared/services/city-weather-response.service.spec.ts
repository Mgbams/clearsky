import { TestBed } from '@angular/core/testing';

import { CityWeatherResponseService } from './city-weather-response.service';

describe('CityWeatherResponseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CityWeatherResponseService = TestBed.get(CityWeatherResponseService);
    expect(service).toBeTruthy();
  });
});

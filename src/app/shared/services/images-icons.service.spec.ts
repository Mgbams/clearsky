import { TestBed } from '@angular/core/testing';

import { ImagesIconsService } from './images-icons.service';

describe('ImagesIconsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImagesIconsService = TestBed.get(ImagesIconsService);
    expect(service).toBeTruthy();
  });
});

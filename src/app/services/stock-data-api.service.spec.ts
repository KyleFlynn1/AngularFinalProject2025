import { TestBed } from '@angular/core/testing';

import { StockDataApiService } from './stock-data-api.service';

describe('StockDataApiService', () => {
  let service: StockDataApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockDataApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

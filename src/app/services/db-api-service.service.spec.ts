import { TestBed } from '@angular/core/testing';

import { DbApiServiceService } from './db-api-service.service';

xdescribe('DbApiServiceService', () => {
  let service: DbApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

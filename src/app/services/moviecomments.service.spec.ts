import { TestBed } from '@angular/core/testing';

import { MoviecommentsService } from './moviecomments.service';

xdescribe('MoviecommentsService', () => {
  let service: MoviecommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviecommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

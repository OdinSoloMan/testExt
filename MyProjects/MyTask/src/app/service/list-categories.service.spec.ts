import { TestBed } from '@angular/core/testing';

import { ListCategoriesService } from './list-categories.service';

describe('ListCategoriesService', () => {
  let service: ListCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

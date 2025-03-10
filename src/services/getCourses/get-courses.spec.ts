import { TestBed } from '@angular/core/testing';

import { GetCoursesService } from './../getCourses/get-courses';

describe('GetUserService', () => {
  let service: GetCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

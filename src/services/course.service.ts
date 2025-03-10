import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class CourseService {
  getCourses() {
    return [{ id: 1, title: 'Angular Basics', description: 'Learn the basics of Angular' }];
  }
}
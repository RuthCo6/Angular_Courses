import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCoursesService {
  private baseUrl = 'http://localhost:3000/api/courses/';
  
  constructor(private http: HttpClient) {}

  deleteCourse(id: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.baseUrl}${id}`, { headers });
  }

  enrollUserInCourse(courseId: number, userId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}${courseId}/enroll`, { userId }, { headers });
  }

  unenrollUserFromCourse(courseId: number, userId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.baseUrl}${courseId}/unenroll`, {
      headers,
      body: { userId }
    });
  }

  getAllCourses(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.baseUrl, { headers });
  }
}

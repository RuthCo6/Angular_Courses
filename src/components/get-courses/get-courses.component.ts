import { Component } from '@angular/core';

import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { course } from '../../models/course';
import { GetCoursesService } from '../../services/getCourses/get-courses';
import { Router } from '@angular/router';
import { user } from '../../models/user';
@Component({
  selector: 'app-get-user',
  imports: [
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatListModule,
    MatDividerModule],
  templateUrl: './get-courses.component.html',
  styleUrl: './get-courses.component.css'
})
export class GetCoursesComponent {
  courses:course[] = []; // מערך המשתמשים
    token:string|any=sessionStorage.getItem("token")
    role:string|any=localStorage.getItem('role')
  constructor(private courseService:GetCoursesService,private http:HttpClient,private router: Router) {}
delete(id:number|undefined){
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  this.http.delete(`http://localhost:3000/api/courses/${id}`, { headers })
    .subscribe(
      (response) => {
        console.log('Course deleted successfully', response);
        this.courses = this.courses.filter(course => course.id !== id);
      },
      (error) => {
        console.error('Error deleting course', error); // טיפול בשגיאות
      }
    );
 }
 editCourse(course: any) {
  this.router.navigate(['/NewCourses'], { state: { courseData: course } });
}
showLesson(course: any) {
  this.router.navigate(['/GetLessons'], { state: { courseData: course  } });
}
  ngOnInit() {
    this.courseService.getAllCourses(this.token).subscribe(
      (data) => {
        this.courses = data; // שמירת המידע במערך
      },
      (error) => {
        console.error('Error fetching users', error); // טיפול בשגיאות
      }
    );
  }
  AddPerson(c:course){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const userId: string|null=localStorage.getItem('userId')
    this.http.post<user>(`http://localhost:3000/api/courses/${c.id}/enroll`,{userId},{headers})
    .subscribe(
      (response) => {
        console.log('the  user join successfully', response);
        
      },
      (error) => {
        console.error('Error ', error); // טיפול בשגיאות
        alert('הנך רשום כבר לקורס זה')
      }
    );
  }
  deletePerson(c:course){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const userId: string|null=localStorage.getItem('userId')
    this.http.delete<user>(`http://localhost:3000/api/courses/${c.id}/unenroll`, {
      headers,
      body: { userId } // הוספת userId לגוף הבקשה
  })
    .subscribe(
      (response) => {
        console.log('the  user delete successfully', response);
        
      },
      (error) => {
        console.error('Error ', error); // טיפול בשגיאות
        alert('הנך לא רשום לקורס זה')
      }
    );
  }
}

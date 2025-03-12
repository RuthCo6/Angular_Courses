import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { course } from '../../models/course';
import { GetCoursesService } from '../../services/getCourses/get-courses.service';
import { Router } from '@angular/router';
import { user } from '../../models/user';
import { AuthService } from '../../services/auth.service'; // הוספתי את שירות ה־AuthService

@Component({
  selector: 'app-get-user',
  imports: [
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './get-courses.component.html',
  styleUrls: ['./get-courses.component.css']
})
export class GetCoursesComponent implements OnInit {
  courses: course[] = []; // מערך הקורסים
  token: string = ''; // הוספתי את משתנה הטוקן
  role: string | any = localStorage.getItem('role');

  constructor(
    private courseService: GetCoursesService,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService // הוספתי את שירות ניהול הטוקן
  ) {}

  ngOnInit(): void {
    this.token = this.authService.getToken() ?? ''; // קבלת הטוקן באמצעות השירות
    this.fetchCourses(); // קריאה לפונקציה להורדת קורסים
  }

  // פונקציה להורדת קורסים
  fetchCourses(): void {
    this.courseService.getAllCourses(this.token).subscribe(
      (data) => {
        this.courses = data; // שמירת הקורסים במערך
      },
      (error) => {
        console.error('Error fetching courses', error); // טיפול בשגיאות
      }
    );
  }

  // פונקציה למחיקת קורס
  delete(id: number | undefined): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.delete(`http://localhost:3000/api/courses/${id}`, { headers })
      .subscribe(
        (response) => {
          console.log('Course deleted successfully', response);
          this.courses = this.courses.filter(course => course.id !== id); // עדכון רשימת הקורסים
        },
        (error) => {
          console.error('Error deleting course', error); // טיפול בשגיאות
        }
      );
  }

  // פונקציה לעריכת קורס
  editCourse(course: any): void {
    this.router.navigate(['/newCourses'], { state: { courseData: course } });
  }

  // פונקציה להצגת שיעורים של קורס
  showLesson(course: any): void {
    this.router.navigate(['/getLessons'], { state: { courseData: course } });
  }

  // פונקציה להוספת משתמש לקורס
  AddPerson(c: course): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    const userId: string | null = localStorage.getItem('userId');
    if (!userId) return;

    this.http.post<user>(`http://localhost:3000/api/courses/${c.id}/enroll`, { userId }, { headers })
      .subscribe(
        (response) => {
          console.log('User enrolled successfully', response);
        },
        (error) => {
          console.error('Error enrolling user', error); // טיפול בשגיאות
          alert('הנך רשום כבר לקורס זה');
        }
      );
  }

  // פונקציה להסרת משתמש מקורס
  deletePerson(c: course): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    const userId: string | null = localStorage.getItem('userId');
    if (!userId) return;

    this.http.delete<user>(`http://localhost:3000/api/courses/${c.id}/unenroll`, {
      headers,
      body: { userId } // הוספת userId לגוף הבקשה
    })
      .subscribe(
        (response) => {
          console.log('User unenrolled successfully', response);
        },
        (error) => {
          console.error('Error unenrolling user', error); // טיפול בשגיאות
          alert('הנך לא רשום לקורס זה');
        }
      );
  }
}

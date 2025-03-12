import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { lesson } from '../../models/lesson';
import { GetCoursesService } from '../../services/getCourses/get-courses.service';
import { Router } from '@angular/router';
import { course } from '../../models/course';

@Component({
  selector: 'app-get-lessons',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './get-lessons.component.html',
  styleUrl: './get-lessons.component.css'
})
export class GetLessonsComponent implements OnInit {
  lessons: lesson[] = []; // מערך השיעורים
  token: string = ''; // משתנה לאחסון הטוקן
  role: string | any = localStorage.getItem('role');
  courseData: any;

  constructor(
    private courseService: GetCoursesService,
    private http: HttpClient,
    private router: Router
  ) {
    // קבלת נתוני הקורס מהניווט
    const navigation = this.router.getCurrentNavigation();
    this.courseData = navigation?.extras.state?.['courseData'];
  }

  ngOnInit() {
    this.token = sessionStorage.getItem('token') ?? ''; // קבלת הטוקן מה-sessionStorage
    if (this.token) {
      this.loadLessons();
    } else {
      console.error('Token not found');
    }
  }

  // פונקציה לטעינת השיעורים
  loadLessons() {
    this.courseService.getAllLessons(this.token, this.courseData.id).subscribe(
      (data) => {
        this.lessons = data; // שמירת השיעורים במערך
      },
      (error) => {
        console.error('Error fetching lessons', error); // טיפול בשגיאות
      }
    );
  }

  // פונקציה למחיקת שיעור
  delete(lessonId: number | undefined) {
    const courseId: number = this.courseData.id;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    // קריאה למחיקת שיעור מהשרת
    this.http.delete(`http://localhost:3000/api/courses/${courseId}/lessons/${lessonId}`, { headers })
      .subscribe(
        (response) => {
          console.log('Lesson deleted successfully', response);
          // עדכון המערך לאחר מחיקת השיעור
          this.lessons = this.lessons.filter(lesson => lesson.id !== lessonId);
        },
        (error) => {
          console.error('Error deleting lesson', error); // טיפול בשגיאות
        }
      );
  }

  // פונקציה לעריכת שיעור
  editCourse(lesson: any) {
    const course = this.courseData;
    const courseData = JSON.parse(JSON.stringify(course)); // המרת הקורס לאובייקט פשוט
    this.router.navigate(['/newLesson'], { state: { courseData, lesson } });
  }

  // פונקציה להוספת שיעור חדש
  AddLesson() {
    const course = this.courseData;
    const courseData = JSON.parse(JSON.stringify(course)); // המרת הקורס לאובייקט פשוט
    console.log("📤 נתונים שנשלחים לניווט:", courseData);
    this.router.navigate(['/newLesson'], { state: { courseData } });
  }
}

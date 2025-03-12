<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GetCoursesService } from '../../services/getCourses/get-courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-course',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './new_course.component.html',
  styleUrls: ['./new_course.component.css']
})
export class NewCourseComponent implements OnInit {
  postCourseForm: FormGroup;
  token: string = '';
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private courseService: GetCoursesService,
    private router: Router
  ) {
    // אם יש נתונים מהניווט
    const navigation = this.router.getCurrentNavigation();
    const courseData = navigation?.extras.state?.['courseData'];
    
    // הגדרת הטופס לפי נתוני הקורס
    this.postCourseForm = this.fb.group({
      course: this.fb.group({
        title: [courseData ? courseData.title : '', Validators.required],
        description: [courseData ? courseData.description : '', Validators.required],
        id: [courseData ? courseData.id : null]
      })
    });
    
    if (courseData) {
      this.isEditMode = true;
    }

    // אתחול הטוקן מ-sessionStorage (בדיקה אם קיים)
    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('token') ?? ''; // אם אין טוקן, משתמשים בערך ברירת מחדל
    }
  }

  ngOnInit(): void {
    // כאן אפשר להוסיף לוגיקה נוספת בעת אתחול הקומפוננטה אם צריך
  }

  onSubmit(): void {
    let userId: string | null = '';
    
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      userId = storedUserId ?? ''; // אם לא נמצא, משתמשים בערך ברירת מחדל
    }

    console.log(userId);
    console.log(this.postCourseForm.value.course.id);

    // עדכון או הוספת קורס
    if (this.isEditMode) {
      if (this.postCourseForm.valid) {
        console.log(this.postCourseForm.value);
        this.courseService.putCoursr(
          this.postCourseForm.value.course.title,
          this.postCourseForm.value.course.description,
          userId,
          this.token,
          this.postCourseForm.value.course.id
        ).subscribe({
          next: (data) => {
            console.log("הקורס עודכן בהצלחה");
            console.log(data);
          },
          error: (err) => console.log("no")
        });
      }
    } else {
      if (this.postCourseForm.valid) {
        console.log(this.postCourseForm.value);
        this.courseService.postCoursr(
          this.postCourseForm.value.course.title,
          this.postCourseForm.value.course.description,
          userId,
          this.token
        ).subscribe({
          next: (data) => console.log("הקורס נוסף בהצלחה"),
          error: (err) => console.log("no")
        });
      }
    }
  }
}
=======
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GetCoursesService } from '../../services/getCourses/get-courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-course',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './new_course.component.html',
  styleUrls: ['./new_course.component.css']
})
export class NewCourseComponent implements OnInit {
  postCourseForm: FormGroup;
  token: string = '';
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private courseService: GetCoursesService,
    private router: Router
  ) {
    // אם יש נתונים מהניווט
    const navigation = this.router.getCurrentNavigation();
    const courseData = navigation?.extras.state?.['courseData'];
    
    // הגדרת הטופס לפי נתוני הקורס
    this.postCourseForm = this.fb.group({
      course: this.fb.group({
        title: [courseData ? courseData.title : '', Validators.required],
        description: [courseData ? courseData.description : '', Validators.required],
        id: [courseData ? courseData.id : null]
      })
    });
    
    if (courseData) {
      this.isEditMode = true;
    }

    // אתחול הטוקן מ-sessionStorage (בדיקה אם קיים)
    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('token') ?? ''; // אם אין טוקן, משתמשים בערך ברירת מחדל
    }
  }

  ngOnInit(): void {
    // כאן אפשר להוסיף לוגיקה נוספת בעת אתחול הקומפוננטה אם צריך
  }

  onSubmit(): void {
    let userId: string | null = '';
    
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      userId = storedUserId ?? ''; // אם לא נמצא, משתמשים בערך ברירת מחדל
    }

    console.log(userId);
    console.log(this.postCourseForm.value.course.id);

    // עדכון או הוספת קורס
    if (this.isEditMode) {
      if (this.postCourseForm.valid) {
        console.log(this.postCourseForm.value);
        this.courseService.putCoursr(
          this.postCourseForm.value.course.title,
          this.postCourseForm.value.course.description,
          userId,
          this.token,
          this.postCourseForm.value.course.id
        ).subscribe({
          next: (data) => {
            console.log("הקורס עודכן בהצלחה");
            console.log(data);
          },
          error: (err) => console.log("no")
        });
      }
    } else {
      if (this.postCourseForm.valid) {
        console.log(this.postCourseForm.value);
        this.courseService.postCoursr(
          this.postCourseForm.value.course.title,
          this.postCourseForm.value.course.description,
          userId,
          this.token
        ).subscribe({
          next: (data) => console.log("הקורס נוסף בהצלחה"),
          error: (err) => console.log("no")
        });
      }
    }
  }
}
>>>>>>> dc1607a (Add existing project files)

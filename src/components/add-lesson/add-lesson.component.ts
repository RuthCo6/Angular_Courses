import { Component, OnInit } from '@angular/core';
import { GetCoursesService } from '../../services/getCourses/get-courses.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service'; // הוספתי את שירות ה־AuthService
import { lesson } from '../../models/lesson';

@Component({
  selector: 'app-add-lesson',
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.css']
})
export class AddLessonComponent implements OnInit {
  courseData: any;
  postLessonForm: FormGroup;
  token: string = "";
  isEditMode = false;
  lessonData: any;

  constructor(
    private fb: FormBuilder,
    private courseService: GetCoursesService,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService // הוספתי את השירות לשימוש בטוקן
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.courseData = navigation?.extras.state?.['courseData'];
    this.lessonData = navigation?.extras.state?.['lesson'];

    if (this.lessonData) {
      this.isEditMode = true;
    }

    console.log("📥 נתונים שהתקבלו מהניווט:", this.courseData);

    // יצירת הטופס עבור השיעור
    this.postLessonForm = this.fb.group({
      lesson: this.fb.group({
        title: [this.lessonData ? this.lessonData.title : '', Validators.required],
        content: [this.lessonData ? this.lessonData.content : '', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.token = this.authService.getToken() ?? ''; // שימוש בשירות לניהול הטוקן
  }

  // פעולה לשליחה של השיעור החדש או לעדכון של השיעור הקיים
  onSubmit(): void {
    if (this.isEditMode) {
      // עדכון שיעור קיים
      this.courseService.putLesson(
        this.postLessonForm.value.lesson.title,
        this.postLessonForm.value.lesson.content,
        this.courseData.id,
        this.token,
        this.lessonData.id // ה-ID של השיעור שאתה מעדכן
      ).subscribe({
        next: (data) => {
          console.log("השיעור עודכן בהצלחה", data);
        },
        error: (err) => {
          console.log("שגיאה בעדכון השיעור", err);
        }
      });
    } else {
      // הוספת שיעור חדש
      if (this.postLessonForm && this.postLessonForm.valid) {
        console.log(this.postLessonForm.value);
        this.courseService.postLesson(
          this.postLessonForm.value.lesson.title,
          this.postLessonForm.value.lesson.content,
          this.courseData.id,
          this.token
        ).subscribe({
          next: (data) => {
            console.log("הקורס נוסף בהצלחה", data);
          },
          error: (err) => {
            console.log("שגיאה בהוספת שיעור", err);
          }
        });
      }
    }
  }
}

import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { GetCoursesComponent } from '../components/get-courses/get-courses.component';
import { NewCourseComponent } from '../components/new-course/new_course.component';
import { GetLessonsComponent } from '../components/get-lessons/get-lessons.component';
import { AddLessonComponent } from '../components/add-lesson/add-lesson.component';


export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'getCourses', component: GetCoursesComponent },
    { path: 'newCourses', component: NewCourseComponent },
    { path: 'getLessons', component: GetLessonsComponent },
    { path: 'newLesson', component: AddLessonComponent },
];


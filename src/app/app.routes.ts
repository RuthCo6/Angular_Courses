import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { GetCoursesComponent } from '../components/get-courses/get-courses.component';
import { NewCourseComponent } from '../components/new-course/new_course.component';
import { GetLessonsComponent } from '../components/get-lessons/get-lessons.component';
import { AddLessonComponent } from '../components/add-lesson/add-lesson.component';

export const routes: Routes = [
    {path: 'Login',component: LoginComponent},
    {path: 'Register',component: RegisterComponent},
    {path: 'GetCourses',component: GetCoursesComponent},
    {path: 'NewCourses',component: NewCourseComponent},
    {path: 'GetLessons',component: GetLessonsComponent},
    {path: 'NewLesson',component: AddLessonComponent},
];

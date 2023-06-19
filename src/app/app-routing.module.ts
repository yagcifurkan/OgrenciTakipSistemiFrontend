import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { TeacherLoginComponent } from './components/teacher/teacher-login/teacher-login.component';
import { RegisterComponent } from './components/register/register.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { StudentComponent } from './components/student/student.component';
import { StudentManagerComponent } from './components/teacher/student-manager/student-manager.component';
import { StudentAddComponent } from './components/teacher/student-add/student-add.component';
import { AnnouncementManagerComponent } from './components/teacher/announcement-manager/announcement-manager.component';
import { AnnouncementAddComponent } from './components/teacher/announcement-add/announcement-add.component';
import { MessageAddComponent } from './components/teacher/message-add/message-add.component';
import { StudentDetailComponent } from './components/teacher/student-detail/student-detail.component';
import { AbsenceAddComponent } from './components/teacher/absence-add/absence-add.component';
import { AbsenceEditComponent } from './components/teacher/absence-edit/absence-edit.component';
import { GradeAddComponent } from './components/teacher/grade-add/grade-add.component';
import { GradeEditComponent } from './components/teacher/grade-edit/grade-edit.component';
import { LessonManagerComponent } from './components/teacher/lesson-manager/lesson-manager.component';
import { LessonAddComponent } from './components/teacher/lesson-add/lesson-add.component';
import { LessonEditComponent } from './components/teacher/lesson-edit/lesson-edit.component';
import { LoginGuard } from './guards/login.guard';
import { TeacherGuard } from './guards/teacher.guard';
import { StudentGuard } from './guards/student.guard';
import { StudentLoginComponent } from './components/student/student-login/student-login.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'teacher-login', component: TeacherLoginComponent },
  { path: 'student-login', component: StudentLoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'teacher',
    component: TeacherComponent,
    canActivate: mapToCanActivate([TeacherGuard]),
    children: [
      {
        path: 'students',
        component: StudentManagerComponent,
      },
      {
        path: 'student/detail/:id',
        component: StudentDetailComponent,
      },
      {
        path: 'student/add',
        component: StudentAddComponent,
      },
      {
        path: 'absence/add/:id',
        component: AbsenceAddComponent,
      },
      {
        path: 'absence/edit/:id',
        component: AbsenceEditComponent,
      },
      {
        path: 'grade/add/:id',
        component: GradeAddComponent,
      },
      {
        path: 'grade/edit/:id',
        component: GradeEditComponent,
      },
      {
        path: 'lessons',
        component: LessonManagerComponent,
      },
      {
        path: 'lesson/add',
        component: LessonAddComponent,
      },
      {
        path: 'lesson/edit/:id',
        component: LessonEditComponent,
      },
      {
        path: 'announcements',
        component: AnnouncementManagerComponent,
      },
      {
        path: 'announcement/add',
        component: AnnouncementAddComponent,
      },
      {
        path: 'message/add/:id',
        component: MessageAddComponent,
      },
    ],
  },
  {
    path: 'student',
    canActivate: mapToCanActivate([StudentGuard]),
    component: StudentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { StudentComponent } from './components/student/student.component';
import { StudentManagerComponent } from './components/teacher/student-manager/student-manager.component';
import { StudentAddComponent } from './components/teacher/student-add/student-add.component';
import { AnnouncementManagerComponent } from './components/teacher/announcement-manager/announcement-manager.component';
import { AnnouncementAddComponent } from './components/teacher/announcement-add/announcement-add.component';
import { MessageAddComponent } from './components/teacher/message-add/message-add.component';
import { StudentDetailComponent } from './components/teacher/student-detail/student-detail.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AbsenceAddComponent } from './components/teacher/absence-add/absence-add.component';
import { AbsenceEditComponent } from './components/teacher/absence-edit/absence-edit.component';
import { DatePipe } from '@angular/common';
import { GradeAddComponent } from './components/teacher/grade-add/grade-add.component';
import { GradeEditComponent } from './components/teacher/grade-edit/grade-edit.component';
import { StoreModule } from '@ngrx/store';
import { AppReducers } from './store/app.reducer';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { LessonAddComponent } from './components/teacher/lesson-add/lesson-add.component';
import { LessonEditComponent } from './components/teacher/lesson-edit/lesson-edit.component';
import { LessonManagerComponent } from './components/teacher/lesson-manager/lesson-manager.component';
import { RegisterComponent } from './components/register/register.component';
import { TeacherLoginComponent } from './components/teacher/teacher-login/teacher-login.component';
import { StudentLoginComponent } from './components/student/student-login/student-login.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TeacherLoginComponent,
    RegisterComponent,
    TeacherComponent,
    StudentComponent,
    StudentManagerComponent,
    StudentAddComponent,
    StudentDetailComponent,
    AnnouncementManagerComponent,
    AnnouncementAddComponent,
    MessageAddComponent,
    LoadingSpinnerComponent,
    AbsenceAddComponent,
    AbsenceEditComponent,
    GradeAddComponent,
    GradeEditComponent,
    LessonAddComponent,
    LessonEditComponent,
    LessonManagerComponent,
    StudentLoginComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    StoreModule.forRoot(AppReducers)
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

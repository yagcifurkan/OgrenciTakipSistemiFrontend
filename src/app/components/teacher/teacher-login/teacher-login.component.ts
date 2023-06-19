import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css'],
})
export class TeacherLoginComponent implements OnInit {
  teacherLoginForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createTeacherLoginForm();
  }

  createTeacherLoginForm() {
    this.teacherLoginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (!this.teacherLoginForm.valid) {
      this.toastrService.error('There are missing fields.');
      return;
    }

    let loginModel: LoginModel = { ...this.teacherLoginForm.value };

    this.authService.login(loginModel).subscribe(
      (response) => {
        this.localStorageService.set('tokenModel', response.data);
        this.localStorageService.set(
          'userEmail',
          this.teacherLoginForm.get('email')?.value
        );
        this.toastrService.info(response.message);
        this.router.navigateByUrl('teacher/students');
      },
      (errorResponse) => this.toastrService.error(errorResponse.error)
    );
  }
}

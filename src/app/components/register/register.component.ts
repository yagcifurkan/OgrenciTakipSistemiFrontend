import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterForTeacherModel } from 'src/app/models/registerForTeacherModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  teacherRegisterForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createTeacherForm();
  }

  createTeacherForm() {
    this.teacherRegisterForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      faculty: ['', Validators.required],
      department: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  register() {
    if (!this.teacherRegisterForm.valid) {
      this.toastrService.error('There are missing fields.');
      return;
    }

    let teacherRegisterModel: RegisterForTeacherModel = {
      ...this.teacherRegisterForm.value,
    };

    this.authService
      .registerForTeacher(teacherRegisterModel)
      .subscribe((response) => {
        this.toastrService.info(response.message);
      });
      this.router.navigateByUrl('login');
  }
}

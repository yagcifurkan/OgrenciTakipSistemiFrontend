import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegisterForStudentModel } from 'src/app/models/registerForStudentModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css'],
})
export class StudentAddComponent implements OnInit {
  studentAddForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createStudentForm();
  }

  createStudentForm() {
    this.studentAddForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      faculty: ['', Validators.required],
      department: ['', Validators.required],
    });
  }

  add() {
    if (!this.studentAddForm.valid) {
      this.toastrService.error('There are missing fields.');
      return;
    }

    let studentAddModel: RegisterForStudentModel = {
      ...this.studentAddForm.value,
    };

    this.authService
      .registerForStudent(studentAddModel)
      .subscribe((response) => {
        this.toastrService.info(response.message);
      });
  }
}

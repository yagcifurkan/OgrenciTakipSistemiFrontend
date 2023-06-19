import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Absence } from 'src/app/models/absence';
import { Lesson } from 'src/app/models/lesson';
import { Student } from 'src/app/models/student';
import { AbsenceService } from 'src/app/services/absence.service';
import { LessonService } from 'src/app/services/lesson.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-absence-add',
  templateUrl: './absence-add.component.html',
  styleUrls: ['./absence-add.component.css'],
})
export class AbsenceAddComponent implements OnInit {
  studentAbsenceAddForm!: FormGroup;
  lessons: Lesson[] = [];
  student!: Student;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private absenceService: AbsenceService,
    private lessonService: LessonService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getLessons();
    this.getStudentIdFromParam();
    this.createStudentAbsenceForm();
  }

  getStudentIdFromParam() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) return this.getStudentById(params['id']);
    });
  }

  createStudentAbsenceForm() {
    this.studentAbsenceAddForm = this.formBuilder.group({
      lessonId: ['', Validators.required],
      date: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  getStudentById(studentId: number) {
    this.studentService.getStudentById(studentId).subscribe((response) => {
      this.student = response.data;
    });
  }

  getLessons() {
    this.lessonService.getLessons().subscribe((response) => {
      this.lessons = response.data;
    });
  }

  add() {
    if (!this.studentAbsenceAddForm.valid) {
      this.toastrService.error('There are missing fields.');
      return;
    }

    let absenceModel: Absence = {
      studentId: this.student.id,
      ...this.studentAbsenceAddForm.value,
    };

    this.absenceService.add(absenceModel).subscribe((response) => {
      this.toastrService.info(response.message);
      this.router.navigate(['student', this.student.id]);
    });
  }
}

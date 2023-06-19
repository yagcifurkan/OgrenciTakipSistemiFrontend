import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Grade } from 'src/app/models/grade';
import { Lesson } from 'src/app/models/lesson';
import { Student } from 'src/app/models/student';
import { GradeService } from 'src/app/services/grade.service';
import { LessonService } from 'src/app/services/lesson.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-grade-add',
  templateUrl: './grade-add.component.html',
  styleUrls: ['./grade-add.component.css']
})
export class GradeAddComponent implements OnInit {
  gradeAddForm!: FormGroup;
  lessons: Lesson[] = [];
  student!: Student;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private gradeService: GradeService,
    private lessonService: LessonService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getStudentIdFromParam();
    this.createGradeForm();
    this.getLessons();
  }

  getStudentIdFromParam() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) return this.getStudentById(params['id']);
    });
  }

  createGradeForm() {
    this.gradeAddForm = this.formBuilder.group({
      lessonId: ['', Validators.required],
      midtermExam: [null],
      finalExam: [null],
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
    if (!this.gradeAddForm.valid) {
      this.toastrService.error('There are missing fields.');
      return;
    }

    let gradeModel: Grade = {
      studentId: this.student.id,
      ...this.gradeAddForm.value,
    };

    this.gradeService.add(gradeModel).subscribe((response) => {
      this.toastrService.info(response.message);
      this.router.navigate(['student', this.student.id]);
    });
  }
}
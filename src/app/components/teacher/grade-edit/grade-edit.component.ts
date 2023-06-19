import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Grade } from 'src/app/models/grade';
import { Lesson } from 'src/app/models/lesson';
import { GradeService } from 'src/app/services/grade.service';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
  selector: 'app-grade-edit',
  templateUrl: './grade-edit.component.html',
  styleUrls: ['./grade-edit.component.css']
})
export class GradeEditComponent implements OnInit {
  gradeEditForm!: FormGroup;
  lessons: Lesson[] = [];
  grade!: Grade;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private gradeService: GradeService,
    private lessonService: LessonService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getGradeIdFromParam();
    this.getLessons();
  }

  getGradeIdFromParam() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) return this.getGradeById(params['id']);
    });
  }

  createGradeForm() {
    this.gradeEditForm = this.formBuilder.group({
      lessonId: [this.grade.lessonId, Validators.required],
      midtermExam: [this.grade.midtermExam],
      finalExam: [this.grade.finalExam],
    });
  }

  getGradeById(gradeId: number) {
    this.gradeService.getGradeById(gradeId).subscribe((response) => {
      this.grade = response.data;
      this.createGradeForm();
    });
  }

  getLessons() {
    this.lessonService.getLessons().subscribe((response) => {
      this.lessons = response.data;
    });
  }

  update() {
    if (!this.gradeEditForm.valid) {
      this.toastrService.warning('There are missing fields.');
      return;
    }

    let gradeModel: Grade = {
      id: this.grade.id,
      studentId: this.grade.studentId,
      ...this.gradeEditForm.value,
    };

    this.gradeService.update(gradeModel).subscribe((response) => {
      this.toastrService.info(response.message);
      this.router.navigate(['/student', this.grade.studentId]);
    });
  }
}
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Absence } from 'src/app/models/absence';
import { Lesson } from 'src/app/models/lesson';
import { AbsenceService } from 'src/app/services/absence.service';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
  selector: 'app-absence-edit',
  templateUrl: './absence-edit.component.html',
  styleUrls: ['./absence-edit.component.css'],
})
export class AbsenceEditComponent implements OnInit {
  studentAbsenceEditForm!: FormGroup;
  lessons: Lesson[] = [];
  absence!: Absence;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private absenceService: AbsenceService,
    private lessonService: LessonService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getLessons();
    this.getAbsenceIdFromParam();
  }

  getAbsenceIdFromParam() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) return this.getAbsenceById(params['id']);
    });
  }

  createStudentAbsenceForm() {
    this.studentAbsenceEditForm = this.formBuilder.group({
      lessonId: [this.absence.lessonId, Validators.required],
      date: [this.datePipe.transform(this.absence.date, 'yyyy-MM-dd'), Validators.required,],
      status: [this.absence.status, Validators.required],
    });
  }

  getLessons() {
    this.lessonService.getLessons().subscribe((response) => {
      this.lessons = response.data;
    });
  }

  getAbsenceById(absenceId: number) {
    this.absenceService.getAbsenceById(absenceId).subscribe((response) => {
      this.absence = response.data;
      this.createStudentAbsenceForm();
    });
  }

  update() {
    if (!this.studentAbsenceEditForm.valid) {
      this.toastrService.warning('There are missing fields.');
      return;
    }

    let absenceModel: Absence = {
      id: this.absence.id,
      studentId: this.absence.studentId,
      ...this.studentAbsenceEditForm.value,
    };

    this.absenceService.update(absenceModel).subscribe((response) => {
      this.toastrService.info(response.message);
    });
  }
}

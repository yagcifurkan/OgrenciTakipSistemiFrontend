import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Lesson } from 'src/app/models/lesson';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
  selector: 'app-lesson-add',
  templateUrl: './lesson-add.component.html',
  styleUrls: ['./lesson-add.component.css']
})
export class LessonAddComponent implements OnInit {
  lessonAddForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private lessonService: LessonService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createLessonForm();
  }

  createLessonForm() {
    this.lessonAddForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  add() {
    if (!this.lessonAddForm.valid) {
      this.toastrService.error('There are missing fields.');
      return;
    }

    let lessonModel: Lesson = {
      ...this.lessonAddForm.value,
    };

    this.lessonService
      .add(lessonModel)
      .subscribe((response) => {
        this.toastrService.info(response.message);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/models/lesson';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
  selector: 'app-lesson-manager',
  templateUrl: './lesson-manager.component.html',
  styleUrls: ['./lesson-manager.component.css']
})
export class LessonManagerComponent implements OnInit {
  lessons: Lesson[] = [];
  dataLoaded: boolean = false;

  constructor(private lessonService: LessonService) { }

  ngOnInit(): void {
    this.getLessons();
  }

  getLessons() {
    this.lessonService.getLessons().subscribe((response) => {
      this.lessons = response.data;
      this.dataLoaded = true;
    });
  }
}
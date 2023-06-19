import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbsenceDetail } from 'src/app/models/absenceDetail';
import { GradeDetail } from 'src/app/models/gradeDetail';
import { StudentDetail } from 'src/app/models/studentDetail';
import { AbsenceService } from 'src/app/services/absence.service';
import { GradeService } from 'src/app/services/grade.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css'],
})
export class StudentDetailComponent implements OnInit {
  student!: StudentDetail;
  absences: AbsenceDetail[] = [];
  grades: GradeDetail[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private absenceService: AbsenceService,
    private gradeService: GradeService,
  ) {}

  ngOnInit(): void {
    this.getStudentIdFromParam();
  }

  getStudentIdFromParam() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getStudentDetailById(params['id']);
        this.getAbsenceDetailsByStudentId(params['id']);
        this.getGradeDetailsByStudentId(params['id']);
      }
    });
  }

  getStudentDetailById(studentId: number) {
    this.studentService.getStudentDetailById(studentId).subscribe((response) => {
      this.student = response.data;
    });
  }

  getAbsenceDetailsByStudentId(studentId: number) {
    this.absenceService.getAbsenceDetailsByStudentId(studentId).subscribe((response) => {
      this.absences = response.data;
    });
  }

  getGradeDetailsByStudentId(studentId: number) {
    this.gradeService.getGradeDetailsByStudentId(studentId).subscribe((response) => {
      this.grades = response.data;
    });
  }
}

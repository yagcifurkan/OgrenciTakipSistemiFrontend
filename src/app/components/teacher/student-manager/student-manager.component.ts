import { Component, OnInit } from '@angular/core';
import { StudentDetail } from 'src/app/models/studentDetail';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-manager',
  templateUrl: './student-manager.component.html',
  styleUrls: ['./student-manager.component.css']
})
export class StudentManagerComponent implements OnInit {
  students: StudentDetail[] = [];
  dataLoaded: boolean = false;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudentDetails();
  }

  getStudentDetails() {
    this.studentService.getStudentDetails().subscribe((response) => {
      this.students = response.data;
      this.dataLoaded = true;
    });
  }
}

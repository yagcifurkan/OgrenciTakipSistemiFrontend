import { Component, OnInit } from '@angular/core';
import { AbsenceDetail } from 'src/app/models/absenceDetail';
import { Announcement } from 'src/app/models/announcement';
import { GradeDetail } from 'src/app/models/gradeDetail';
import { MessageDetail } from 'src/app/models/messageDetail';
import { StudentDetail } from 'src/app/models/studentDetail';
import { UserDetail } from 'src/app/models/userDetail';
import { AbsenceService } from 'src/app/services/absence.service';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { AuthService } from 'src/app/services/auth.service';
import { GradeService } from 'src/app/services/grade.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  userDetail!: UserDetail;
  absences: AbsenceDetail[] = [];
  announcements: Announcement[] = [];
  grades: GradeDetail[] = [];
  messages: MessageDetail[] = [];

  constructor(
    private authService: AuthService,
    private absenceService: AbsenceService,
    private announcementService: AnnouncementService,
    private gradeService: GradeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getUserDetailFromStore();
    this.getAbsenceDetailsByStudentId();
    this.getAnnouncements();
    this.getGradeDetailsByStudentId();
    this.getMessageDetailsByReceiverUserId();
  }

  getUserDetailFromStore() {
    this.authService.userDetail$.subscribe((userDetail) => {
      if (userDetail) {
        this.userDetail = userDetail;
      }
    });
  }

  getAbsenceDetailsByStudentId() {
    this.absenceService
      .getAbsenceDetailsByStudentId(this.userDetail.studentId)
      .subscribe((response) => {
        this.absences = response.data;
      });
  }

  getAnnouncements() {
    this.announcementService.getAnnouncements().subscribe((response) => {
      this.announcements = response.data;
    });
  }

  getGradeDetailsByStudentId() {
    this.gradeService
      .getGradeDetailsByStudentId(this.userDetail.studentId)
      .subscribe((response) => {
        this.grades = response.data;
      });
  }

  getMessageDetailsByReceiverUserId() {
    this.messageService
      .getMessageDetailsByReceiverUserId(this.userDetail.id)
      .subscribe((response) => {
        this.messages = response.data;
      });
  }
}

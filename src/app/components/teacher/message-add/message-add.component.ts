import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Message } from 'src/app/models/message';
import { Student } from 'src/app/models/student';
import { UserDetail } from 'src/app/models/userDetail';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-message-add',
  templateUrl: './message-add.component.html',
  styleUrls: ['./message-add.component.css'],
})
export class MessageAddComponent implements OnInit {
  messageAddForm!: FormGroup;
  userDetail!: UserDetail;
  student!: Student;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private studentService: StudentService,
    private messageService: MessageService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUserDetailFromStore();
    this.getStudentIdFromParam();
    this.createMessageForm();
  }

  getUserDetailFromStore() {
    this.authService.userDetail$.subscribe((userDetail) => {
      if (userDetail) {
        this.userDetail = userDetail;
      }
    });
  }

  getStudentIdFromParam() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) return this.getStudentById(params['id']);
    });
  }

  createMessageForm() {
    this.messageAddForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  getStudentById(studentId: number) {
    this.studentService.getStudentById(studentId).subscribe((response) => {
      this.student = response.data;
    });
  }

  add() {
    if (!this.messageAddForm.valid) {
      this.toastrService.error('There are missing fields.');
      return;
    }

    let messageModel: Message = {
      senderUserId: this.userDetail.id,
      reciverUserId: this.student.userId,
      ...this.messageAddForm.value,
    };

    this.messageService.add(messageModel).subscribe((response) => {
      this.toastrService.info(response.message);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Announcement } from 'src/app/models/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-announcement-add',
  templateUrl: './announcement-add.component.html',
  styleUrls: ['./announcement-add.component.css'],
})
export class AnnouncementAddComponent implements OnInit {
  announcementAddForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private announcementService: AnnouncementService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createAnnouncementForm();
  }

  createAnnouncementForm() {
    this.announcementAddForm = this.formBuilder.group({
      faculty: ['', Validators.required],
      department: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  add() {
    if (!this.announcementAddForm.valid) {
      this.toastrService.error('There are missing fields.');
      return;
    }

    let announcementModel: Announcement = {
      ...this.announcementAddForm.value,
    };

    this.announcementService.add(announcementModel).subscribe((response) => {
      this.toastrService.info(response.message);
    });
  }
}

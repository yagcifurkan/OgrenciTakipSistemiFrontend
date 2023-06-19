import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Announcement } from '../models/announcement';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  apiControllerURL = `${environment.apiURL}/Announcements`;

  constructor(private httpClient: HttpClient) {}

  add(announcement: Announcement): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiControllerURL}/add`,
      announcement
    );
  }

  update(announcement: Announcement): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiControllerURL}/update`,
      announcement
    );
  }

  delete(announcement: Announcement): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiControllerURL}/delete`,
      announcement
    );
  }

  getAnnouncements(): Observable<ListResponseModel<Announcement>> {
    return this.httpClient.get<ListResponseModel<Announcement>>(
      `${this.apiControllerURL}/getall`
    );
  }

  getAnnouncementById(announcementId: number): Observable<SingleResponseModel<Announcement>> {
    return this.httpClient.get<SingleResponseModel<Announcement>>(
      `${this.apiControllerURL}/getbyid?id=${announcementId}`
    );
  }
}

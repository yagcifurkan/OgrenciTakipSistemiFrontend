import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Lesson } from '../models/lesson';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  apiControllerURL = `${environment.apiURL}/Lessons`;

  constructor(private httpClient: HttpClient) { }

  add(lesson: Lesson): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiControllerURL}/add`,
      lesson
    );
  }

  update(lesson: Lesson): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiControllerURL}/update`,
      lesson
    );
  }

  delete(lesson: Lesson): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiControllerURL}/delete`,
      lesson
    );
  }

  getLessons(): Observable<ListResponseModel<Lesson>> {
    return this.httpClient.get<ListResponseModel<Lesson>>(
      `${this.apiControllerURL}/getall`
    );
  }

  getLessonById(lessonId: number): Observable<SingleResponseModel<Lesson>> {
    return this.httpClient.get<SingleResponseModel<Lesson>>(
      `${this.apiControllerURL}/getbyid?id=${lessonId}`
    );
  }
}

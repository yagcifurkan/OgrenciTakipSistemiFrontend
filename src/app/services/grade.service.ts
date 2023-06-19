import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Grade } from '../models/grade';
import { GradeDetail } from '../models/gradeDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  apiControllerURL = `${environment.apiURL}/Grades`;

  constructor(private httpClient: HttpClient) {}

  add(grade: Grade): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiControllerURL}/add`,
      grade
    );
  }

  update(grade: Grade): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiControllerURL}/update`,
      grade
    );
  }

  delete(grade: Grade): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiControllerURL}/delete`,
      grade
    );
  }

  getGrades(): Observable<ListResponseModel<Grade>> {
    return this.httpClient.get<ListResponseModel<Grade>>(
      `${this.apiControllerURL}/getall`
    );
  }

  getGradeById(gradeId: number): Observable<SingleResponseModel<Grade>> {
    return this.httpClient.get<SingleResponseModel<Grade>>(
      `${this.apiControllerURL}/getbyid?id=${gradeId}`
    );
  }

  getGradeDetailsByStudentId(studentId: number): Observable<ListResponseModel<GradeDetail>> {
    return this.httpClient.get<ListResponseModel<GradeDetail>>(
      `${this.apiControllerURL}/getgradedetailsbystudentid?studentId=${studentId}`
    );
  }
}

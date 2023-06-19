import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Student } from '../models/student';
import { environment } from 'src/environments/environment';
import { StudentDetail } from '../models/studentDetail';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  apiControllerURL = `${environment.apiURL}/Students`;

  constructor(private httpClient: HttpClient) { }

  add(student: Student): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiControllerURL}/add`,
      student
    );
  }

  update(student: Student): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiControllerURL}/update`,
      student
    );
  }

  delete(student: Student): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiControllerURL}/delete`,
      student
    );
  }

  getStudents(): Observable<ListResponseModel<Student>> {
    return this.httpClient.get<ListResponseModel<Student>>(
      `${this.apiControllerURL}/getall`
    );
  }

  getStudentById(studentId: number): Observable<SingleResponseModel<Student>> {
    return this.httpClient.get<SingleResponseModel<Student>>(
      `${this.apiControllerURL}/getbyid?id=${studentId}`
    );
  }

  getStudentDetails(): Observable<ListResponseModel<StudentDetail>> {
    return this.httpClient.get<ListResponseModel<StudentDetail>>(
      `${this.apiControllerURL}/getstudentdetails`
    );
  }

  getStudentDetailById(studentId: number): Observable<SingleResponseModel<StudentDetail>> {
    return this.httpClient.get<SingleResponseModel<StudentDetail>>(
      `${this.apiControllerURL}/getstudentdetailbyid?id=${studentId}`
    );
  }
}

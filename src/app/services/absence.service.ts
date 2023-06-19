import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Absence } from '../models/absence';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { AbsenceDetail } from '../models/absenceDetail';

@Injectable({
  providedIn: 'root',
})
export class AbsenceService {
  apiControllerURL = `${environment.apiURL}/Absences`;

  constructor(private httpClient: HttpClient) {}

  add(absence: Absence): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiControllerURL}/add`,
      absence
    );
  }

  update(absence: Absence): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiControllerURL}/update`,
      absence
    );
  }

  delete(absence: Absence): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.apiControllerURL}/delete`,
      absence
    );
  }

  getAbsences(): Observable<ListResponseModel<Absence>> {
    return this.httpClient.get<ListResponseModel<Absence>>(
      `${this.apiControllerURL}/getall`
    );
  }

  getAbsenceById(absenceId: number): Observable<SingleResponseModel<Absence>> {
    return this.httpClient.get<SingleResponseModel<Absence>>(
      `${this.apiControllerURL}/getbyid?id=${absenceId}`
    );
  }

  getAbsenceDetailsByStudentId(studentId: number): Observable<ListResponseModel<AbsenceDetail>> {
    return this.httpClient.get<ListResponseModel<AbsenceDetail>>(
      `${this.apiControllerURL}/getabsencedetailsbystudentid?studentId=${studentId}`
    );
  }
}

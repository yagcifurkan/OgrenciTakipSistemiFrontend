import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserDetail } from '../models/userDetail';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiControllerURL = `${environment.apiURL}/users`;

  constructor(private httpClient: HttpClient) {}

  getUserDetailByEmail(
    userEmail: string
  ): Observable<SingleResponseModel<UserDetail>> {
    return this.httpClient.get<SingleResponseModel<UserDetail>>(
      `${this.apiControllerURL}/getuserdetailbyemail`,
      {
        params: {
          userEmail: userEmail,
        },
      }
    );
  }
}

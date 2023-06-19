import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { ResponseModel } from '../models/responseModel';
import { TokenModel } from '../models/tokenModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Observable, map } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterForTeacherModel } from '../models/registerForTeacherModel';
import { RegisterForStudentModel } from '../models/registerForStudentModel';
import { Store } from '@ngrx/store';
import { UserDetail } from '../models/userDetail';
import { AppState } from '../store/app.reducer';
import { setUserDetail, deleteUserDetail } from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiControllerURL: string = `${environment.apiURL}/auth`;
  userDetail$: Observable<UserDetail | undefined> = this.store
    .select((s) => s.appAuth)
    .pipe(map((b) => b.userDetail));

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {}

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      `${this.apiControllerURL}/login`,
      loginModel
    );
  }

  registerForTeacher(
    registerTeacherModel: RegisterForTeacherModel
  ): Observable<SingleResponseModel<TokenModel>> {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      `${this.apiControllerURL}/registerforteacher`,
      registerTeacherModel
    );
  }

  registerForStudent(
    registerStudentModel: RegisterForStudentModel
  ): Observable<SingleResponseModel<TokenModel>> {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      `${this.apiControllerURL}/registerforstudent`,
      registerStudentModel
    );
  }

  logout() {
    this.localStorageService.remove('tokenModel');
    this.localStorageService.remove('userEmail');
    this.deleteUserDetail();
  }

  isAuthenticated(
    userEmail?: string | null,
    requiredRoles?: string[]
  ): Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>(
      `${this.apiControllerURL}/isauthenticated`,
      {
        params:
          userEmail && requiredRoles
            ? {
                userEmail: userEmail,
                requiredRoles: requiredRoles.join(','),
              }
            : {},
      }
    );
  }

  setUserDetail(userDetail: UserDetail) {
    this.store.dispatch(setUserDetail({ userDetail: userDetail }));
  }

  deleteUserDetail() {
    this.store.dispatch(deleteUserDetail());
  }
}

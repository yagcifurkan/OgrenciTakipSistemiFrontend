import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let tokenModel: TokenModel | null =
      this.localStorageService.get<TokenModel>('tokenModel');

    let newRequest: HttpRequest<any> = request.clone({
      headers: request.headers.set(
        'Authorization',
        `Bearer ${tokenModel?.token}`
      ),
    });

    return next.handle(newRequest);
  }
}

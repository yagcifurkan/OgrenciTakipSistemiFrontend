import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { UserDetail } from 'src/app/models/userDetail';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TeacherGuard {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userEmail: string | null =
      this.localStorageService.get<string>('userEmail');
    return this.authService.isAuthenticated(userEmail, ['teacher']).pipe(
      map((response) => {
        return response.success;
      }),
      catchError(() => {
        this.router.navigate(['']);
        this.toastrService.info('You are not authorized to access this page.');
        return of(false);
      })
    );
  }
}

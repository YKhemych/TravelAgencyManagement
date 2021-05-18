import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private authService: AuthService;
  private static tokenSubjectError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private injector: Injector, private httpClient: HttpClient) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthService);
    if (!this.authService.getToken()) return;

    return next.handle(request).pipe(
      catchError((err) => {
        if (!this.authService.getRefreshToken()) return;

        if (err.status === 401) {
          if (!RefreshTokenInterceptor.tokenSubjectError.getValue()) {
            RefreshTokenInterceptor.tokenSubjectError.next(true);
            return this.handleUnauthorizedError(request, next);
          } else {
            // If it's not the first error, it has to wait until get the new tokens
            return this.waitNewTokens().pipe(
              switchMap((event: any) => {
                // request with new Access Token
                return next.handle(this.addToken(request));
              })
            );
          }
        }

        return throwError(err);
      })
    );
  }

  // Wait until get the new tokens
  private waitNewTokens(): Observable<any> {
    const subject = new Subject<any>();
    const waitToken$: Subscription = RefreshTokenInterceptor.tokenSubjectError.subscribe(
      (error: boolean) => {
        if (!error) {
          subject.next();
          waitToken$.unsubscribe();
        }
      }
    );
    return subject.asObservable();
  }

  private addToken(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        Authorization: `${this.authService.getToken()}`
      }
    });
  }

  private handleUnauthorizedError(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.authService.getRefreshToken()) return;
    // Get a new tokens
    return this.httpClient
      .post(environment.BACK_END_URL + '/auth/refresh', {
        refreshToken: this.authService.getRefreshToken()
      })
      .pipe(
        switchMap((newToken: any) => {
          // Save new Tokens
          this.authService.storeTokens(newToken);

          RefreshTokenInterceptor.tokenSubjectError.next(false);
          // request with new Access Token
          return next.handle(this.addToken(request));
        }),
        catchError((er) => {
          localStorage.clear();
          this.authService.logOut();
          return throwError(er.error.message);
        })
      );
  }
}

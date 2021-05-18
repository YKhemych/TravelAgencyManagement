import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route,
  ActivatedRoute
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private _router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!localStorage.getItem('token')) {
      return true;
    }

    // navigate to dashboard page
    this._router.navigate(['/dashboard']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}

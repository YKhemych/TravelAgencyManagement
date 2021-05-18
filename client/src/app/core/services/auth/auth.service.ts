import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ApiService } from '../../api/api';
import { of } from 'rxjs';
import { SignInResponse, TokenResponse } from '../../../models/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authenticationData: SignInResponse;

  constructor(
    public router: Router,
    @Inject(DOCUMENT) private document: any,
    private api: ApiService
  ) {}

  login(params) {
    return this.api.post('/auth/login', params);
  }

  resetPassword(params) {
    return this.api.post('/auth/reset_pass', params);
  }

  setNewPassword(params) {
    return this.api.post('/auth/change_pass', params);
  }

  createAccount(params) {
    return this.api.post('/auth/register', params);
  }

  getCurrentUser() {
    return this.api.get('/account');
  }

  /**
   * Stores tokens
   * @param token token response from signin response
   */
  public storeTokens(token: TokenResponse) {
    localStorage.setItem('token', token.accessToken);
    localStorage.setItem('refreshToken', token.refreshToken);
  }

  /**
   * Removes tokens
   */
  public removeTokens() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  /**
   * * Removes tokens and redirect to "Dashboard" page
   */
  public logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('templateSource');
    this.router.navigate(['/sign-in']);
  }

  /**
   * Gets token
   * @returns authentication token
   */
  public getToken() {
    return localStorage.getItem('token') || [];
  }

  /**
   * Gets refresh token
   * @returns authentication refresh token
   */
  public getRefreshToken() {
    return localStorage.getItem('refreshToken') || [];
  }
}

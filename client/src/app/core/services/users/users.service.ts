import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ApiService } from '../../api/api';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    public router: Router,
    @Inject(DOCUMENT) private document: any,
    private api: ApiService
  ) {}

  getCurrentUser() {
    return this.api.get('/user');
  }
}

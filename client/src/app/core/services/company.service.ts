import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ApiService } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  constructor(
    public router: Router,
    @Inject(DOCUMENT) private document: any,
    private api: ApiService
  ) {}

  getCompany() {
    return this.api.get('/company');
  }

  createCompany(data) {
    return this.api.post('/company', data);
  }
}

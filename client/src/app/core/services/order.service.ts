import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ApiService } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(
    public router: Router,
    @Inject(DOCUMENT) private document: any,
    private api: ApiService
  ) {}

  getAllOrders(limit: number, offset: number) {
    return this.api.get(`/order?limit=${limit}&offset=${offset}`);
  }

  getOrderById(id: number) {
    return this.api.get(`/order/${id}`);
  }

  createOrder(data) {
    return this.api.post('/order', data);
  }
}

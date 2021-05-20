import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ApiService } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  constructor(
    public router: Router,
    @Inject(DOCUMENT) private document: any,
    private api: ApiService
  ) {}

  getAllHotels(limit: number, offset: number) {
    return this.api.get(`/hotel?limit=${limit}&offset=${offset}`);
  }

  getHotelsForUser() {
    return this.api.get('/hotel/user');
  }

  getHotelById(id: number) {
    return this.api.get(`/hotel/${id}`);
  }

  createHotel(data) {
    return this.api.post('/hotel', data);
  }

  createHotelImages(data, hotelId) {
    return this.api.postFormData(`/hotel/image/${hotelId}`, data);
  }
}

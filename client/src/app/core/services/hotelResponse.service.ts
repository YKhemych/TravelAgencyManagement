import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ApiService } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class HotelResponsesService {
  constructor(
    public router: Router,
    @Inject(DOCUMENT) private document: any,
    private api: ApiService
  ) {}

  getAllHotelResponses(hotelId: number, limit: number = 1000, offset: number = 0) {
    return this.api.get(`/hotelResponse/${hotelId}?limit=${limit}&offset=${offset}`);
  }

  createHotelResponse(data) {
    return this.api.post('/hotelResponse', data);
  }
}

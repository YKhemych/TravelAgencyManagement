import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../core/services/alert/alert.service';
import { environment } from '../../../environments/environment';
import { HotelArrayDataModel, HotelModel } from '../../models/hotel.model';
import { HotelsService } from '../../core/services/hotel.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  host: string = environment.BACK_END_URL;
  hotels: HotelModel[] = [];
  public pageSize = 16;
  public currentPage = 0;
  public totalSize = 100;
  public offset = 0;
  public limit = this.pageSize;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private hotelsService: HotelsService
  ) {}

  ngOnInit() {
    this.getHotels();
  }

  getHotels() {
    this.hotelsService
      .getAllHotels(this.limit, this.offset)
      .subscribe((res: HotelArrayDataModel) => {
        this.hotels = res.data;
        this.totalSize = res.totalCount;
      });
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    this.limit = (this.currentPage + 1) * this.pageSize;
    this.offset = this.currentPage * this.pageSize;
    this.getHotels();
  }
}

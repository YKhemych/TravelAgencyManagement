import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../core/services/alert/alert.service';
import { HotelsService } from '../../../core/services/hotel.service';
import { environment } from "../../../../environments/environment";
import {HotelDataModel, HotelModel} from '../../../models/hotel.model';
import {UserModel} from "../../../models/authentication.model";
import {UsersService} from "../../../core/services/users/users.service";

@Component({
  selector: 'app-hotel-info',
  templateUrl: './hotel-info.component.html',
  styleUrls: ['./hotel-info.component.scss']
})
export class HotelInfoComponent implements OnInit {
  host: string = environment.BACK_END_URL;
  hotel: HotelModel;
  user: UserModel;
  slides = [];
  hotelId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private usersService: UsersService,
    private hotelsService: HotelsService
  ) {}

  ngOnInit() {
    this.hotelId = Number(this.route.snapshot.paramMap.get('hotelId'));
    this.getHotelData();
    this.getUser();
  }

  getHotelData() {
    this.hotelsService.getHotelById(this.hotelId).subscribe((res: HotelDataModel) => {
      this.hotel = res.data;

      this.hotel.hotelImages.map((hotelImage) => {
        this.slides.push({image: `${this.host}/${hotelImage.imagePath}`})
      })
    },
      () => {
        this.router.navigate(['/dashboard']);
      });
  }

  getUser() {
    this.usersService.getCurrentUser().subscribe((res: UserModel) => {
      this.user = res;
    });
  }

}

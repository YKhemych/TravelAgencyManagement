import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../core/services/alert/alert.service';
import { HotelsService } from '../../../core/services/hotel.service';
import { environment } from '../../../../environments/environment';
import { HotelDataModel, HotelModel } from '../../../models/hotel.model';
import { UserModel } from '../../../models/authentication.model';
import { UsersService } from '../../../core/services/users/users.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable, Subject } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';
import { OrderArrayDataModel, OrderDataModel, OrderModel } from '../../../models/order.model';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import { OrdersService } from '../../../core/services/order.service';
import {
  HotelResponseArrayDataModel,
  HotelResponseModel
} from '../../../models/hotelResponse.model';
import { HotelResponsesService } from '../../../core/services/hotelResponse.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-hotel-info',
  templateUrl: './hotel-info.component.html',
  styleUrls: ['./hotel-info.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class HotelInfoComponent implements OnInit {
  host: string = environment.BACK_END_URL;
  hotel: HotelModel;
  hotelResponses: HotelResponseModel[];
  user: UserModel;
  userOrders: OrderModel[];
  slides = [];
  hotelId: number;
  rooms: string[] = [];
  allRooms: string[] = [];
  public createOrderForm: FormGroup;
  public isSubmitted: boolean = false;

  roomCtrl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredRooms: Observable<string[]>;
  @ViewChild('roomInput') roomInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  public createHotelResponseForm: FormGroup;
  public isSubmittedHotelResp: boolean = false;

  public allowToLeaveResponse: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private usersService: UsersService,
    private hotelsService: HotelsService,
    private hotelResponsesService: HotelResponsesService,
    private ordersService: OrdersService
  ) {
    this.createOrderForm = this.formBuilder.group({
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
      rooms: new FormControl('', []),
      description: new FormControl('', [Validators.required])
    });

    this.createHotelResponseForm = this.formBuilder.group({
      mark: new FormControl('', [Validators.required, Validators.max(10), Validators.min(0)]),
      description: new FormControl('', [Validators.required])
    });

    this.filteredRooms = this.roomCtrl.valueChanges.pipe(
      startWith(null),
      map((room: string | null) => (room ? this._filter(room) : this.allRooms.slice()))
    );
  }

  async ngOnInit() {
    this.hotelId = Number(this.route.snapshot.paramMap.get('hotelId'));
    await this.getHotelData();
    await this.getUser();
    await this.getHotelResponse();
    await this.getUserOrdersAndCount();
  }

  refreshData() {
    this.getHotelData();
    this.getHotelResponse();
    this.getUserOrdersAndCount();
  }

  getHotelData() {
    this.hotelsService.getHotelById(this.hotelId).subscribe(
      (res: HotelDataModel) => {
        this.hotel = res.data;

        this.slides = this.hotel.hotelImages.map((hotelImage) => {
          return { image: `${this.host}/${hotelImage.imagePath}` };
        });

        this.hotel.rooms.map((room) => {
          this.allRooms.push(room.name);
        });
      },
      () => {
        this.router.navigate(['/dashboard']);
      }
    );
  }

  getUser() {
    this.usersService.getCurrentUser().subscribe((res: UserModel) => {
      this.user = res;
    });
  }

  getUserOrdersAndCount() {
    this.ordersService.getAllOrders().subscribe((res: OrderArrayDataModel) => {
      this.userOrders = res.data;

      const executedOrders = this.userOrders.filter((userOrder) => {
        return userOrder.isExecuted && userOrder.userId === this.user.id;
      });

      const userResponses = this.hotelResponses.filter((response) => {
        return response.userId === this.user.id;
      });

      if (executedOrders.length > userResponses.length && executedOrders.length !== 0) {
        this.allowToLeaveResponse = true;
      }
    });
  }

  getHotelResponse() {
    this.hotelResponsesService
      .getAllHotelResponses(this.hotelId)
      .subscribe((res: HotelResponseArrayDataModel) => {
        this.hotelResponses = res.data;
      });
  }

  createOrder() {
    this.isSubmitted = true;

    if (this.rooms.length === 0) {
      this.alertService.openErrorModal('error', 'Please chose at least one room');
      this.isSubmitted = false;
    }

    const startTime = this.createOrderForm.get('startTime').value;
    const endTime = this.createOrderForm.get('endTime').value;
    let price = 0;

    const diffTime = Math.abs(endTime - startTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const roomIds = this.rooms.map((roomName) => {
      const selectedRoom = this.hotel.rooms.find((room) => room.name === roomName);

      if (!selectedRoom) {
        this.alertService.openErrorModal('error', `Room ${roomName} does not exist`);
        this.isSubmitted = false;
      }

      price += selectedRoom.pricePerDay * diffDays; // change days number

      return selectedRoom.id;
    });

    const order: OrderModel = {
      startTime: moment(startTime).utc().format(),
      endTime: moment(endTime).format(),
      description: this.createOrderForm.get('description').value,
      hotelId: this.hotel.id,
      userId: this.user.id,
      price,
      roomIds
    };

    const orderData = { data: order };

    this.ordersService.createOrder(orderData).subscribe(
      (result) => {
        if (result) {
          this.router.navigate(['/order']);
        }
      },
      (err) => {
        this.alertService.openErrorModal('error', err.error.message);
        this.isSubmitted = false;
      }
    );
  }

  createHotelResponse() {
    this.isSubmittedHotelResp = false;

    const hotelResponse: HotelResponseModel = {
      mark: this.createHotelResponseForm.get('mark').value,
      description: this.createHotelResponseForm.get('description').value,
      hotelId: this.hotel.id,
      userId: this.user.id
    };

    this.hotelResponsesService.createHotelResponse({ data: hotelResponse }).subscribe(
      (result) => {
        if (result) {
          this.allowToLeaveResponse = false;

          this.refreshData();
        }
      },
      (err) => {
        this.alertService.openErrorModal('error', err.error.message);
        this.isSubmitted = false;
      }
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.rooms.push(value);
    }

    this.createOrderForm.setValue(null);
  }

  remove(room: string): void {
    const index = this.rooms.indexOf(room);

    if (index >= 0) {
      this.rooms.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.rooms.push(event.option.viewValue);
    this.roomInput.nativeElement.value = '';
    this.createOrderForm.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allRooms.filter((fruit) => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}

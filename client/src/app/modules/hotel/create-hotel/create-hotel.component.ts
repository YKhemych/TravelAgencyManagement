import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../core/services/alert/alert.service';
import { CompaniesService } from '../../../core/services/company.service';
import { CompanyDto } from '../../../../../../src/dto/company.dto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressDto } from '../../../../../../src/dto/address.dto';
import {HotelModel} from "../../../models/hotel.model";
import {HotelsService} from "../../../core/services/hotel.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.scss']
})
export class CreateHotelComponent implements OnInit {
  public createHotelForm: FormGroup;
  public isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private hotelsService: HotelsService
  ) {
    this.createHotelForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      images: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required, Validators.minLength(3)]),
      latitude: new FormControl('', []),
      longitude: new FormControl('', [])
    });
  }

  ngOnInit() {}

  createHotel() {
    this.isSubmitted = true;
    let location;

    if (
      this.createHotelForm.get('latitude').value &&
      this.createHotelForm.get('latitude').value
    ) {
      location = {
        latitude: this.createHotelForm.get('latitude').value,
        longitude: this.createHotelForm.get('latitude').value
      };
    }

    const hotel: HotelModel = {
      name: this.createHotelForm.get('name').value,
      phone: this.createHotelForm.get('phone').value,
      description: this.createHotelForm.get('description').value,
      address: {
        country: this.createHotelForm.get('country').value,
        city: this.createHotelForm.get('city').value,
        state: this.createHotelForm.get('state').value,
        street: this.createHotelForm.get('street').value,
        zip: this.createHotelForm.get('zip').value,
        location
      } as AddressDto
    };

    const hotelData = { data: hotel };

    const formData = new FormData();

    this.createHotelForm.get('images').value._files.forEach((image) => {
      formData.append('images', image);
    });

    this.hotelsService.createHotel(hotelData).subscribe(
      (result) => {
        if (result) {
          this.hotelsService.createHotelImages(formData, result.data.id).subscribe(
            (result) => {
              if (result) {
                this.router.navigate(['/company']);
              }
            }
          )
        }
      },
      (err) => {
        this.alertService.openErrorModal('error', err.error.message);
        this.isSubmitted = false;
      }
    );
  }
}

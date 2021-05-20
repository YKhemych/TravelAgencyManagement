import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../core/services/alert/alert.service';
import { CompaniesService } from '../../../core/services/company.service';
import { CompanyDto } from '../../../../../../src/dto/company.dto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressDto } from '../../../../../../src/dto/address.dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit {
  public createCompanyForm: FormGroup;
  public isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private companiesService: CompaniesService
  ) {
    this.createCompanyForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
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

  createCompany() {
    this.isSubmitted = true;
    let location;

    if (
      this.createCompanyForm.get('latitude').value &&
      this.createCompanyForm.get('latitude').value
    ) {
      location = {
        latitude: this.createCompanyForm.get('latitude').value,
        longitude: this.createCompanyForm.get('latitude').value
      };
    }

    const company: CompanyDto | any = {
      name: this.createCompanyForm.get('name').value,
      email: this.createCompanyForm.get('email').value,
      phone: this.createCompanyForm.get('phone').value,
      address: {
        country: this.createCompanyForm.get('country').value,
        city: this.createCompanyForm.get('city').value,
        state: this.createCompanyForm.get('state').value,
        street: this.createCompanyForm.get('street').value,
        zip: this.createCompanyForm.get('zip').value,
        location
      } as AddressDto
    };

    const companyData = { data: company };

    this.companiesService.createCompany(companyData).subscribe(
      (result) => {
        if (result) {
          this.router.navigate(['/company']);
        }
      },
      (err) => {
        this.alertService.openErrorModal('error', err.error.message);
        this.isSubmitted = false;
      }
    );
  }
}

import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../core/services/alert/alert.service';
import { CompaniesService } from '../../core/services/company.service';
import { HotelsService } from '../../core/services/hotel.service';
import { HotelArrayDataModel, HotelModel } from '../../models/hotel.model';
import { CompanyDataModel, CompanyModel } from '../../models/company.model';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-dashboard',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  host: string = environment.BACK_END_URL;
  company: CompanyModel;
  hotels: HotelModel[] = [];

  public pageSize = 8;
  public currentPage = 0;
  public totalSize = 100;
  public offset = 0;
  public limit = this.pageSize

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private companiesService: CompaniesService,
    private hotelsService: HotelsService
  ) {}

  ngOnInit() {
    this.getCompanyDataForUser();
  }

  getCompanyDataForUser() {
    this.companiesService.getCompany().subscribe((res: CompanyDataModel) => {
      this.company = res.data;
    });
    this.getHotelsForUser();
  }

  getHotelsForUser() {
    this.hotelsService.getHotelsForUser(this.limit, this.offset).subscribe((res: HotelArrayDataModel) => {
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
    this.getHotelsForUser();
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../core/services/alert/alert.service';
import { environment } from '../../../../environments/environment';
import { OrdersService } from '../../../core/services/order.service';
import { OrderArrayDataModel, OrderModel } from '../../../models/order.model';
import * as moment from 'moment';
import { UserModel } from '../../../models/authentication.model';
import { UsersService } from '../../../core/services/users/users.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  host: string = environment.BACK_END_URL;
  user: UserModel;
  orders: OrderModel[] = [];
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 100;
  public offset = 0;
  public limit = this.pageSize;

  actionControl = new FormControl('');

  actions = [
    { name: 'Відхилити', value: 'canceled' },
    { name: 'Схалити', value: 'accepted' },
    { name: 'Оплатити', value: 'paid' },
    { name: 'Виконано', value: 'executed' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private usersService: UsersService,
    private ordersService: OrdersService
  ) {}

  ngOnInit() {
    this.getUser();
    this.getOrders();
  }

  getUser() {
    this.usersService.getCurrentUser().subscribe((res: UserModel) => {
      this.user = res;
    });
  }

  getOrders() {
    this.ordersService
      .getAllOrders(this.limit, this.offset)
      .subscribe((res: OrderArrayDataModel) => {
        this.orders = res.data.map((order) => {
          order.startTime = moment(order.startTime).utc().format('YYYY-MM-DD');
          order.endTime = moment(order.endTime).utc().format('YYYY-MM-DD');

          order.status = 'pending';
          if (new Date(order.startTime) < new Date() || order.deletedAt) {
            order.status = 'canceled';
          }
          if (order.isAccepted) {
            order.status = 'accepted';
          }
          if (order.isPaid) {
            order.status = 'paid';
          }
          if (order.isExecuted) {
            order.status = 'executed';
          }

          return order;
        });
        this.totalSize = res.totalCount;
      });
  }

  public getDescByStatus(status: string) {
    switch (status) {
      case 'pending':
        return 'Очікує на розгляд';
      case 'canceled':
        return 'Відхилено';
      case 'accepted':
        return 'Схвалено, очікуєм на оплату';
      case 'paid':
        return 'Оплачено, очікуєм на прибуття';
      case 'executed':
        return 'Винонано';
    }
  }

  public getActionDisabled(status, action): boolean {
    switch (status) {
      case 'pending':
        if (action.value === 'canceled' || action.value === 'accepted') {
          return false;
        }
        return true;
      case 'accepted':
        if (action.value === 'paid') {
          return false;
        }
        return true;
      case 'paid':
        if (action.value === 'executed') {
          return false;
        }
        return true;
      default:
        return true;
    }
  }

  public changeStatus(orderId: number) {
    const action = this.actionControl.value.value;

    const order = {
      id: orderId,
      isAccepted: action === 'accepted' ? true : undefined,
      isExecuted: action === 'executed' ? true : undefined,
      isPaid: action === 'paid' ? true : undefined,
      deletedAt: action === 'canceled' ? new Date() : undefined
    };

    console.log(order);

    this.ordersService.updateOrder({ data: order }).subscribe(
      (res) => {
        if (res) {
          this.getOrders();
        }
      },
      (err) => {
        this.alertService.openErrorModal('error', err.error.message);
      }
    );
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    this.limit = (this.currentPage + 1) * this.pageSize;
    this.offset = this.currentPage * this.pageSize;
    this.getOrders();
  }
}

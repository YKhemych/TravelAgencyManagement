import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListRoutingModule } from './order-list-routing.module';
import { OrderListComponent } from './order-list.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, MatButtonModule, OrderListRoutingModule, SharedModule],
  declarations: [OrderListComponent]
})
export class OrderListModule {}

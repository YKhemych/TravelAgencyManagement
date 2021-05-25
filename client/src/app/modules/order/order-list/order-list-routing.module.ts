import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list.component';
import { LayoutComponent } from '../../../shared/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: {
      breadcrumb: 'home'
    },
    children: [
      {
        path: '',
        component: OrderListComponent,
        data: {
          breadcrumb: 'Orders'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderListRoutingModule {}

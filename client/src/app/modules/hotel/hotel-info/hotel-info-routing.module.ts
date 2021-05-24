import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelInfoComponent } from './hotel-info.component';
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
        component: HotelInfoComponent,
        data: {
          breadcrumb: 'Hotel'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelInfoRoutingModule {}

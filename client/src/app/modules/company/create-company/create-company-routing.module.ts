import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCompanyComponent } from './create-company.component';
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
        component: CreateCompanyComponent,
        data: {
          breadcrumb: 'CreateCompany'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateCompanyRoutingModule {}

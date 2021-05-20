import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCompanyRoutingModule } from './create-company-routing.module';
import { CreateCompanyComponent } from './create-company.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, MatButtonModule, CreateCompanyRoutingModule, SharedModule],
  declarations: [CreateCompanyComponent]
})
export class CreateCompanyModule {}

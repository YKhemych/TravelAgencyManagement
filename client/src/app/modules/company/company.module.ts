import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, MatButtonModule, CompanyRoutingModule, SharedModule],
  declarations: [CompanyComponent]
})
export class CompanyModule {}

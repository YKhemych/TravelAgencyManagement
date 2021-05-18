import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, MatButtonModule, DashboardRoutingModule, SharedModule],
  declarations: [DashboardComponent]
})
export class DashboardModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelRoutingModule } from './hotel-routing.module';
import { HotelComponent } from './hotel.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, MatButtonModule, HotelRoutingModule, SharedModule],
  declarations: [HotelComponent]
})
export class HotelModule {}

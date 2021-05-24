import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelInfoRoutingModule } from './hotel-info-routing.module';
import { HotelInfoComponent } from './hotel-info.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [CommonModule, MatButtonModule, HotelInfoRoutingModule, SharedModule],
  declarations: [HotelInfoComponent]
})
export class HotelInfoModule {}

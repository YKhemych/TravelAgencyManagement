import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateHotelRoutingModule } from './create-hotel-routing.module';
import { CreateHotelComponent } from './create-hotel.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../../shared/shared.module';
import {MaterialFileInputModule, NGX_MAT_FILE_INPUT_CONFIG} from "ngx-material-file-input";

@NgModule({
  imports: [CommonModule, MatButtonModule, CreateHotelRoutingModule, SharedModule, MaterialFileInputModule],
  declarations: [CreateHotelComponent],
  providers: [{ provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: {sizeUnit: 'Octet'} }]
})
export class CreateHotelModule {}

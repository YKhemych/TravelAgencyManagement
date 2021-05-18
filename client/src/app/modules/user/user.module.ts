import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [CommonModule, MatButtonModule, UserRoutingModule, SharedModule],
  declarations: [UserComponent]
})
export class UserModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import { SharedModule } from '../../../shared/shared.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    SharedModule,
    SignInRoutingModule,
    ReactiveFormsModule
  ],
  exports: [MatButtonModule, MatFormFieldModule, MatInputModule],
  declarations: [SignInComponent]
})
export class SignInModule {}

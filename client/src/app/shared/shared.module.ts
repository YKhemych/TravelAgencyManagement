import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AlertComponent } from './components/alert/alert.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { AlertService } from '../core/services/alert/alert.service';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from "@angular/material/progress-bar";

/**
 * SharedModule contains code that will be used across the app and Feature Modules. This includes:
 * - common stateless components ('dumb' components)
 * - commonly used pipes and directives
 * - export the commonly used Angular modules (eg CommonModule or the FormsModule) so they can be easily used across the app
 * - export UI Modules (eg Angular Material) or components that are used a lot in the application
 * Note: this might introduce unnecessary loading speed if you don't use those modules/components a lot;
 *       if that's the case, you might want to import these Angular modules only in the Feature Modules that use them.
 *
 * Important note:
 * DO NOT import the SharedModule into the main AppModule or CoreModule, only in specific Feature Modules as needed
 */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatCardModule,
    MatTabsModule,
    MatTreeModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatRadioModule,
    MatSliderModule,
    NgbModule,
    MatExpansionModule,
    MatMenuModule
  ],
  declarations: [
    AlertComponent,
    ConfirmComponent,
    LayoutComponent,
    NavbarComponent,
    HeaderComponent
  ],
  exports: [
    /* core modules */
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatCardModule,
    MatTabsModule,
    MatTreeModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatRadioModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AlertComponent,
    ConfirmComponent,
    MatExpansionModule
  ],
  providers: [AlertService],
  entryComponents: [
    AlertComponent,
    ConfirmComponent,
    LayoutComponent,
    NavbarComponent,
    HeaderComponent
  ]
})
export class SharedModule {}

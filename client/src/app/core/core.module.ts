import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './components/loader/loader.component';
import { MediaMatcher } from '@angular/cdk/layout';

/**
 *
 * [CoreModule]:
 * - global/HTTP services (only one instance of those services will be created across the entire app)
 * - important single use components/classes
 * - export any third party module that is required in the AppModule
 *
 * Important note:
 * Import CoreModule ONLY in the main AppModule, not in the Feature Modules.
 */

@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  declarations: [LoaderComponent],
  providers: [MediaMatcher],
  exports: [HttpClientModule, BrowserAnimationsModule, LoaderComponent, RouterModule]
})
export class CoreModule {}

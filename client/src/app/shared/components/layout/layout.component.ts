import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  private autoLogoutSubscription: Subscription;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }
}

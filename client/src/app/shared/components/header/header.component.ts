import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';
import { UsersService } from '../../../core/services/users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private usersService: UsersService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAllData();
  }

  getAllData() {
    this.usersService.getCurrentUser().subscribe((res) => {
      this.currentUser = res;
      this.cdRef.detectChanges();
    });
  }

  onLogOut() {
    this.authService.logOut();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../core/services/alert/alert.service';
import { UserModel } from '../../models/authentication.model';
import { UsersService } from '../../core/services/users/users.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  currentUser: UserModel;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.getActiveUser();
  }

  getActiveUser() {
    this.usersService.getCurrentUser().subscribe((res) => {
      this.currentUser = res;
    });
  }

  ngOnDestroy() {
    // this.destroy$.next(true);
    // this.destroy$.unsubscribe();
  }
}

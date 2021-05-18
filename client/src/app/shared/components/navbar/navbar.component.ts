import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-navigation',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentTime;
  currentPeriod;
  nightMode = false;
  currentUserEmail = '';
  currentUserName = '';

  @Output() openNavigation: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthService) {}

  ngOnInit() {}
}

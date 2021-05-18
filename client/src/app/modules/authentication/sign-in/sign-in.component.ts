import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';
import { AlertService } from '../../../core/services/alert/alert.service';
import { LoaderService } from '../../../core/services/loader/loader.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  control: FormControl;
  private subscription: Subscription;
  public isLoading: boolean;
  public isSubmitted: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService,
    private loaderService: LoaderService
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  skipLogin() {
    this.router.navigate(['/dashboard']);
  }

  signIn() {
    this.isSubmitted = true;
    this.authService.login(this.loginForm.value).subscribe(
      (result) => {
        this.authService.storeTokens(result);
        this.authService.authenticationData = result;
        this.router.navigate(['/dashboard']);
        window.location.reload();
      },
      (err: HttpErrorResponse) => {
        this.alertService.openErrorModal('Authentication error', err.error.error.message);
      }
    );
  }
}

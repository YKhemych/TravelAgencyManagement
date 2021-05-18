import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MustMatch } from '../../../core/validators/must-match.validator';
import { AlertService } from '../../../core/services/alert/alert.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;
  public isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthService,
    private alertService: AlertService
  ) {
    this.signUpForm = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required]),
        surname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required]),
        managerAccess: new FormControl(false, [])
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );
  }

  ngOnInit() {}

  createAccount() {
    this.isSubmitted = true;
    const user = {
      name: this.signUpForm.get('name').value,
      surname: this.signUpForm.get('surname').value,
      email: this.signUpForm.get('email').value,
      phone: this.signUpForm.get('phone').value,
      password: this.signUpForm.get('password').value,
      role: this.signUpForm.get('managerAccess').value ? 'owner' : 'user'
    };

    this.authenticationService.createAccount(user).subscribe(
      (result) => {
        if (result) {
          this.router.navigate(['/dashboard']);
        }
      },
      (err) => {
        this.alertService.openErrorModal('error', err.error.message);
        this.isSubmitted = false;
      }
    );
  }
}

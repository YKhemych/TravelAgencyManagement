import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/hotel/hotel.module').then((m) => m.HotelModule)
  },
  {
    path: 'company',
    loadChildren: () => import('./modules/company/company.module').then((m) => m.CompanyModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'createCompany',
    loadChildren: () =>
      import('./modules/company/create-company/create-company.module').then(
        (m) => m.CreateCompanyModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'createHotel',
    loadChildren: () =>
      import('./modules/hotel/create-hotel/create-hotel.module').then(
        (m) => m.CreateHotelModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./modules/authentication/sign-in/sign-in.module').then((m) => m.SignInModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./modules/authentication/sign-up/sign-up.module').then((m) => m.SignUpModule)
  }
  // {
  //   path: 'forgot-password',
  //   loadChildren: () => import('./modules/authentication/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  // },
  // {
  //   path: 'reset-password',
  //   loadChildren: () => import('./modules/authentication/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  // },
  // {
  //   path: '**',
  //   redirectTo: '/sign-in',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

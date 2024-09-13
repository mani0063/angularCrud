import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignUpPageComponent } from './components/signup-up-page/signup-up-page.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
export const routes: Routes = [
    {path:"", redirectTo:"login", pathMatch:"full"},
    {path: 'profile', component: ProfileComponent },
    {path:"login", component:LoginPageComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'update-password', component: UpdatePasswordComponent},
    {path:"signUp", component:SignUpPageComponent},
    {path:"home", component:HomeComponent, canActivate:[AuthGuard]},
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
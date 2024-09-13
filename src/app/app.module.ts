import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {  HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app.routes';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { AuthService } from './auth.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppComponent,
    HttpClientModule,
    AppRoutingModule,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    FormsModule,
    UpdatePasswordComponent
],
  providers: [AuthService],
  bootstrap: []
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';
interface User {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  role: string;
  status: string;
}

@Component({
  selector: 'app-profile',
  standalone:true,
  imports: [CommonModule, RouterOutlet, RouterLink, ReactiveFormsModule, HttpClientModule, HeaderComponent, FooterComponent],
  templateUrl:'./profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor( private apiService: ApiService) {}
  user: User | null = null;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers(): void {
    this.apiService.userProfile().subscribe(
      data => {
        this.user = data;
      },
      error => {
        this.errorMessage = error?.error?.message || 'An error occurred while fetching user data.';
      }
    );
  }
  logout(): void {
    localStorage.removeItem('authToken');
  }
}

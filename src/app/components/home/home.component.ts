import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from '../../footer/footer.component';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-home',
  standalone:true,
  imports: [CommonModule, RouterOutlet, RouterLink, ReactiveFormsModule, HttpClientModule, HeaderComponent , FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public users: any[] = [];
  isSidebarVisible: boolean = true;
  errorMessage: string | null = null;
  constructor( private apiService: ApiService , private authService:AuthService) {}
  ngOnInit(): void {
    this.authService.checkAuthentication();
    this.loadUsers();
  }
  loadUsers(): void {
    this.apiService.getData().subscribe(
      data => {
        this.users = data;
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

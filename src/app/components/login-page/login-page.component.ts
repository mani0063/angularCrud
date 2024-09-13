import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ CommonModule ,RouterOutlet, RouterLink, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  public loginForm!: FormGroup;
  public submitted = false;
  public errorMessage: string | null = null;

  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  login() {
    this.submitted = true;
    this.errorMessage = null;
  
    if (this.loginForm.valid) {
      const loginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      this.apiService.postData(loginData).subscribe(
          res => {
            if (res && res.token) {
              localStorage.setItem('authToken', res.token);
              this.loginForm.reset();
              this.submitted = false;
              this.router.navigate(['/home']);
            } else {
              this.errorMessage = "Invalid email or password.";
            }
          },
          err => {
            this.errorMessage = err?.error?.message || 'Invalid email or password.'
          }
        );
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
}

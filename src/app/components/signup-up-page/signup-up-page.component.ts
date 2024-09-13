import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
@Component({
  selector: 'app-signup-up-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, RouterLink, HttpClientModule],
  templateUrl: './signup-up-page.component.html',
  styleUrl: './signup-up-page.component.css'
})
export class SignUpPageComponent {
  public signUpForm!: FormGroup
  public submitted = false;
  public errorMessage: string | null = null;
  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
    });
  }
  signUp() {
    this.submitted = true;
    this.errorMessage = null;
    if (this.signUpForm.valid) {
      const isFormEmpty = Object.keys(this.signUpForm.controls).every(key =>
        !this.signUpForm.get(key)?.value
      );
      if (isFormEmpty) {
        this.errorMessage = 'All fields are required. Please fill out the form.';
      } else {
        this.errorMessage = 'Please correct the errors in the form.';
      }
      this.apiService.signup(this.signUpForm.value)
        .subscribe(res => {
          this.signUpForm.reset()
          this.router.navigate(["login"])
        }, err => {
          this.errorMessage = err?.error.text || "Some thing went wrong."
        })

    } else {
      return;
    }

    return;
  }
}

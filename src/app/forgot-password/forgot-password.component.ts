import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  message: string | null = null;
  errorMessage: string | null = null;
  submitted: any;

  constructor(private formBuilder: FormBuilder, private router: Router , private apiService:ApiService) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = null;
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value;
      // Handle form submission logic here
      this.apiService.forgetpassword(email)
      .subscribe(res => {
        console.log(res)
        this.forgotPasswordForm.reset()
        this.message = 'A password reset link has been sent to your email address.';
        // this.router.navigate(["login"])
      }, err => {
        this.errorMessage = err?.error.text || "Some thing went wrong."
      })
      
      // Optionally, redirect or handle success
      // this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Please enter a valid email address.';
    }
  }
}

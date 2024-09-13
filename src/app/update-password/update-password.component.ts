import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {
  email: string = '';
  newPassword: string = '';
  updatePasswordForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
      private apiService:ApiService
  ) {
    this.updatePasswordForm = this.formBuilder.group({
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.updatePasswordForm.patchValue({ email: this.email });
    });
  }

  onSubmit(): void {
    if (this.updatePasswordForm.valid) {
      const formValues = this.updatePasswordForm.value;
      // this.authService.updatePassword(this.email, formValues.newPassword).subscribe(
      //   response => {
      //     this.router.navigate(['/login']);
      //   },
      //   error => {
      //     // Handle error
      //     console.error('Error updating password', error);
      //   }
      // );
    }
  }
}

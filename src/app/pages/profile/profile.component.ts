import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule, 
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  isSubmitting = false;
  isSubmittingPassword = false;
  userInfo: any = {
    createdAt: new Date(),
    lastLogin: new Date(),
    lastPasswordChange: new Date(),
    active: true
  };
  recentActivities: any[] = [];

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadUserData();
    this.loadRecentActivities();
  }

  initForms(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      department: [''],
      role: ['']
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  loadUserData(): void {
    const user = this.authService.currentUser;
    if (user) {
      this.profileForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber || '',
     
      });

      this.userService.getUserDetails(user.id).subscribe(details => {
        this.userInfo = details;
      });
    }
  }

  loadRecentActivities(): void {
    const userId = this.authService.currentUser?.id;
    if (userId) {
      this.userService.getUserActivities(userId, 5).subscribe(activities => {
        this.recentActivities = activities;
      });
    }
  }

  updateProfile(): void {
    if (this.profileForm.invalid) return;

    this.isSubmitting = true;
    const userData = this.profileForm.value;

    this.userService.updateUserProfile(this.authService.currentUser!.id, userData).subscribe({
      next: () => {
        // Update local user data
        this.authService.refreshUserData();
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.isSubmitting = false;
      }
    });
  }

  updatePassword(): void {
    if (this.passwordForm.invalid) return;

    this.isSubmittingPassword = true;
    const passwordData = this.passwordForm.value;

    this.userService.changePassword(
      this.authService.currentUser!.id, 
      passwordData.currentPassword, 
      passwordData.newPassword
    ).subscribe({
      next: () => {
        this.passwordForm.reset();
        this.isSubmittingPassword = false;
      },
      error: (error) => {
        console.error('Error changing password:', error);
        this.isSubmittingPassword = false;
      }
    });
  }
}
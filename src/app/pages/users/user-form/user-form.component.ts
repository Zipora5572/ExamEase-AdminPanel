import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatFormFieldModule ,MatInputModule ,MatIconModule,MatSlideToggleModule,  MatSelectModule,
    ReactiveFormsModule, MatCardModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode = false;
  userId: number | null = null;
  isSubmitting = false;
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initForm();
    
   let id = this.route.snapshot.paramMap.get('id');
    this.userId = id ? parseInt(id, 10) : null;
    this.isEditMode = !!this.userId;
    
    if (this.isEditMode && this.userId) {
      this.loadUserData(this.userId);
    }
  }
  
  initForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['student'],
      phone: [''],
      status: [true],
      password: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['']
    }, { validators: this.passwordMatchValidator });
  }
  
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    
    return null;
  }
  
  loadUserData(id: number): void {
    this.userService.getUserById(id).subscribe((user: User) => {
      // Remove password fields for edit mode
      const { passwordHash, ...userData }: Partial<User> = user;
      
      this.userForm.patchValue({
      ...userData,
      password: '',
      confirmPassword: ''
      });
    });
  }
  
  onSubmit(): void {
    if (this.userForm.invalid) return;
    
    this.isSubmitting = true;
    const userData = this.userForm.value;
    
    // Remove confirmPassword before sending to API
    delete userData.confirmPassword;
    
    // If password is empty in edit mode, remove it
    if (this.isEditMode && !userData.password) {
      delete userData.password;
    }
    
    const request = this.isEditMode
      ? this.userService.updateUser(this.userId!, userData)
      : this.userService.createUser(userData);
      
    request.subscribe({
      next: () => {
        this.router.navigate(['/users']);
      },
      error: (error) => {
        console.error('Error saving user:', error);
        this.isSubmitting = false;
      }
    });
  }
  
  goBack(): void {
    this.router.navigate(['/users']);
  }
}
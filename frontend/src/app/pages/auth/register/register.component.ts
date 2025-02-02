import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuccessModalComponent } from '../../../components/shared/success-modal.component';
import { User } from '../../../components/shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, SuccessModalComponent]
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  showModal = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const user: User = {
      username: this.username.trim(),
      email: this.email.trim().toLowerCase(),
      password: this.password,
      role: 'user'
    };

    this.authService.register(user).subscribe({
      next: () => {
        this.showModal = true; // 📌 Mostrar modal
      },
      error: (err) => {
        console.error('Error registering', err);
      }
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.router.navigate(['/login']);
  }
}

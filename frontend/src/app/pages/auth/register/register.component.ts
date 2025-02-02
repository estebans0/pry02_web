import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../components/shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const user: User = {
      username: this.username.trim(),  // Quitar espacios en blanco
      email: this.email.trim().toLowerCase(),
      password: this.password,
      role: 'user'
    };

    console.log('Registrando usuario:', user);  // Debug: Verificar qué se está enviando

    this.authService.register(user).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response); // Verificar respuesta del backend
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error registering:', err);
      }
    });
  }
}

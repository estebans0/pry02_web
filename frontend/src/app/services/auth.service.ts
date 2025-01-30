import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  // Control de estado admin (opcional)
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  public isAdmin$: Observable<boolean> = this.isAdminSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Configura el estado de "admin" (usado en isAdmin$).
   */
  setAdminStatus(isAdmin: boolean): void {
    this.isAdminSubject.next(isAdmin);
  }

  /**
   * Registra a un nuevo usuario. Envía {name, email, password, role, ...} a /register.
   */
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  /**
   * Inicia sesión con email y password.
   * Al recibir el token, lo guarda en localStorage (clave 'token').
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  /**
   * Elimina el token del localStorage, cerrando sesión en el cliente.
   */
  logout(): void {
    localStorage.removeItem('token');
  }

  /**
   * Verifica si hay un token guardado (retorna true/false).
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Obtiene el token actual desde localStorage. Retorna null si no existe.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

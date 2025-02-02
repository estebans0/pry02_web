import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../components/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  // Estado del usuario (admin/user)
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  public isAdmin$: Observable<boolean> = this.isAdminSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkAdminStatus(); // Verifica el estado de admin al iniciar
  }

  /**
   * Registra a un nuevo usuario.
   */
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  /**
   * Inicia sesión y guarda token + rol en localStorage.
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string, role: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        if (response.token && response.role) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          this.setAdminStatus(response.role === 'admin'); // Verifica si es admin
        }
      })
    );
  }

  /**
   * Cierra sesión eliminando token y rol del localStorage.
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.setAdminStatus(false);
  }

  /**
   * Obtiene el rol actual desde localStorage.
   */
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  /**
   * Verifica si el usuario está autenticado.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Devuelve el token actual.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Configura el estado de admin en el observable.
   */
  setAdminStatus(isAdmin: boolean): void {
    this.isAdminSubject.next(isAdmin);
  }

  /**
   * Verifica y establece el estado de admin al inicializar el servicio.
   */
  private checkAdminStatus(): void {
    const role = this.getRole();
    this.setAdminStatus(role === 'admin');
  }

  /**
   * Retorna true si el usuario es admin.
   */
  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }
}

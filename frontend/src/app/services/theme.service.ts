import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(true);
  darkMode$ = this.darkMode.asObservable();

  constructor() {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      this.darkMode.next(savedTheme === 'true');
      this.applyTheme(savedTheme === 'true');
    } else {
      this.applyTheme(true); // Por defecto oscuro
    }
  }

  toggleTheme(): void {
    const current = !this.darkMode.value;
    this.darkMode.next(current);
    localStorage.setItem('darkMode', current.toString());
    this.applyTheme(current);
  }

  private applyTheme(isDark: boolean): void {
    const body = document.body;
    if (isDark) {
      body.classList.add('dark');
      body.classList.remove('light');
    } else {
      body.classList.add('light');
      body.classList.remove('dark');
    }
  }

  isDarkMode(): boolean {
    return this.darkMode.value;
  }
}

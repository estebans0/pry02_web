import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { AuthService } from '../../../services/auth.service';
import { Movie } from '../../../components/shared/models/movie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink]
})

export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMovie(id);
    }

    // Suscribimos isAdmin$
    this.authService.isAdmin$.subscribe(isAdmin => (this.isAdmin = isAdmin));
  }

  loadMovie(id: string): void {
    this.movieService.getMovie(id).subscribe({
      next: (movie) => (this.movie = movie),
      error: (err) => console.error('Error fetching movie', err)
    });
  }

  editMovie(): void {
    // Si la interfaz define id?: string, hay que validar
    if (!this.movie || !this.movie.id) return;
    this.router.navigate(['/movies', this.movie.id, 'edit']);
  }

  deleteMovie(): void {
    if (this.movie && this.movie.id && confirm('¿Estás seguro?')) {
      this.movieService.deleteMovie(this.movie.id).subscribe({
        next: () => this.router.navigate(['/movies']),
        error: (err) => console.error('Error deleting movie', err)
      });
    }
  }
}
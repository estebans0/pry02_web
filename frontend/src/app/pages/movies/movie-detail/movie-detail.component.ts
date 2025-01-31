import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { Movie } from '../../../components/shared/models/movie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class MovieDetailComponent implements OnInit {
  movie!: Movie;
  stars = new Array(5); // Para mostrar 10 estrellas
  userRating: number = 0;
  isAdmin: boolean = false; // Supón que manejas roles en otro servicio

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovieById(id).subscribe((movie) => {
        if (movie) {
          this.movie = movie;
        }
      });
    }
  }

  rateMovie(rating: number): void {
    this.userRating = rating;
  }

  resetRating(): void {
    this.userRating = 0;
  }

  editMovie(): void {
    this.router.navigate(['/movies', this.movie.id, 'edit']);
  }

  deleteMovie(): void {
    if (confirm('¿Estás seguro de eliminar esta película?')) {
      this.movieService.deleteMovie(this.movie.id).subscribe(() => {
        this.router.navigate(['/movies']);
      });
    }
  }
}

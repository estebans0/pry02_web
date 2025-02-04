import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { Movie } from '../../../components/shared/models/movie.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule]
})
export class MovieDetailComponent implements OnInit {
  movie!: Movie;
  stars = new Array(5);
  userRating: number = 0;
  isAdmin: boolean = false;
  isEditing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private authService: AuthService
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
    this.authService.isAdmin$.subscribe(isAdmin => this.isAdmin = isAdmin);
  }

  rateMovie(rating: number): void {
    this.userRating = rating;
  }

  resetRating(): void {
    this.userRating = 0;
  }

  editMovie(): void {
    this.isEditing = true;
  }

  deleteMovie(): void {
    if (confirm('¿Estás seguro de eliminar esta película?')) {
      this.movieService.deleteMovie(this.movie.id).subscribe(() => {
        this.router.navigate(['/movies']);
      });
    }
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.movieService.updateMovie(this.movie.id, this.movie).subscribe(() => {
        this.isEditing = false;
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.movie.mainImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}

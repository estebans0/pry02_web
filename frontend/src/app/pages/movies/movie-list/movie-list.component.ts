import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../../services/movie.service';
import { AuthService } from '../../../services/auth.service';
import { Movie } from '../../../components/shared/models/movie.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  searchTerm = '';
  selectedGenre = '';
  sortBy = 'title';
  genres: string[] = [];
  isAdmin = false;

  // Controles de paginación
  currentPage = 1;
  pageSize = 5;      // Cambia según desees
  totalPages = 1;

  constructor(
    private movieService: MovieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadMovies();
    this.authService.isAdmin$.subscribe(isAdmin => this.isAdmin = isAdmin);
  }
  
  loadMovies(page: number = this.currentPage): void {
    this.movieService.getMovies(page, this.pageSize, this.searchTerm).subscribe({
      next: (res) => {
        this.movies = res.movies;
        this.currentPage = res.page;
        this.totalPages = res.pages;
      },
      error: (err) => {
        console.error('Error fetching movies', err);
      }
    });
  }

  // Siguiente y anterior
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadMovies(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMovies(this.currentPage);
    }
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadMovies(this.currentPage);
  }
  
  extractGenres(): void {
    this.genres = [...new Set(this.movies.map(movie => movie.genre))];
  }

  search(): void {
    this.applyFilters();
  }

  filter(): void {
    this.applyFilters();
  }

  sort(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredMovies = this.movies
      .filter(movie => 
        movie.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (this.selectedGenre ? movie.genre === this.selectedGenre : true)
      )
      .sort((a, b) => {
        if (this.sortBy === 'title') return a.title.localeCompare(b.title);
        if (this.sortBy === 'releaseYear') return b.releaseYear - a.releaseYear;
        if (this.sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }
}

function of(movies: Movie[]): Observable<Movie[]> {
  throw new Error('Function not implemented.');
}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../../services/movie.service';
import { AuthService } from '../../../services/auth.service';
import { Movie } from '../../../components/shared/models/movie.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule]
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  searchTerm = '';
  selectedGenre = '';
  sortBy = 'title';
  genres: string[] = [];
  isAdmin = false;

  constructor(
    private movieService: MovieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadMovies();
    this.authService.isAdmin$.subscribe(isAdmin => this.isAdmin = isAdmin);
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe(
      (movies) => {
        this.movies = movies;
        this.filteredMovies = movies;
        this.extractGenres();
      },
      (error) => console.error('Error fetching movies', error)
    );
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
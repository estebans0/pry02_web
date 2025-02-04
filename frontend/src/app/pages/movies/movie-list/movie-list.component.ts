import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../../services/movie.service';
import { AuthService } from '../../../services/auth.service';
import { Movie } from '../../../components/shared/models/movie.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  // Filtering parameters
  searchTerm = '';
  selectedGenre = '';
  selectedYear: number | null = null;
  selectedRating: number | null = null;
  sortBy = '';

  isAdmin = false;
  currentPage = 1;
  pageSize = 5;
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
    this.movieService.getMovies(
      page,
      this.pageSize,
      this.searchTerm,
      this.sortBy,
      this.selectedGenre,
      this.selectedYear ? this.selectedYear.toString() : '',
      this.selectedRating ? this.selectedRating.toString() : ''
    ).subscribe({
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

  onSearch(): void {
    this.currentPage = 1;
    this.loadMovies(this.currentPage);
  }

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
}

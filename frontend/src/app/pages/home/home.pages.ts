import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../components/shared/models/movie.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieListComponent } from "../movies/movie-list/movie-list.component";
import { MovieFormComponent } from "../movies/movie-form/movie-form.component";
import { MovieDetailComponent } from "../movies/movie-detail/movie-detail.component";
import { RouterModule } from '@angular/router';
import { ActorDetailComponent } from "../actor/actor-detail/actor-detail.component";
import { ActorListComponent } from "../actor/actor-list/actor-list.component";
import { ActorFormComponent } from "../actor/actor-form/actor-form.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.pages.html',
  styleUrls: ['./home.pages.scss'],
  imports: [CommonModule, FormsModule, MovieListComponent, RouterModule, ActorDetailComponent, ActorListComponent, ActorFormComponent],
  standalone: true,
})
export class HomePage implements OnInit {
  featuredMovies: Movie[] = [
    {
      title: 'Oppenheimer',
      mainImage: 'https://i.postimg.cc/7ZJXx0pc/Oppenheimer-Christopher-Nolan-0-1-width-1024-Kh9-HV7-C.jpg',
      id: '1',
      description: 'La historia de J. Robert Oppenheimer, el físico detrás de la bomba atómica.',
      genre: 'Drama',
      director: 'Christopher Nolan',
      releaseYear: 2023,
      rating: 8.9,
      images: [],
      cast: [],
      duration: '3:00',
      tags: [],
      votes: 0
    },
    {
      title: 'Oppenheimer',
      mainImage: 'https://i.postimg.cc/7ZJXx0pc/Oppenheimer-Christopher-Nolan-0-1-width-1024-Kh9-HV7-C.jpg',
      id: '1',
      description: 'La historia de J. Robert Oppenheimer, el físico detrás de la bomba atómica.',
      genre: 'Drama',
      director: 'Christopher Nolan',
      releaseYear: 2023,
      rating: 8.9,
      images: [],
      cast: [],
      duration: '3:00',
      tags: [],
      votes: 0
    },
    {
      title: 'Oppenheimer',
      mainImage: 'https://i.postimg.cc/7ZJXx0pc/Oppenheimer-Christopher-Nolan-0-1-width-1024-Kh9-HV7-C.jpg',
      id: '1',
      description: 'La historia de J. Robert Oppenheimer, el físico detrás de la bomba atómica.',
      genre: 'Drama',
      director: 'Christopher Nolan',
      releaseYear: 2023,
      rating: 8.9,
      images: [],
      cast: [],
      duration: '3:00',
      tags: [],
      votes: 0
    },
    {
      title: 'Oppenheimer',
      mainImage: 'https://i.postimg.cc/7ZJXx0pc/Oppenheimer-Christopher-Nolan-0-1-width-1024-Kh9-HV7-C.jpg',
      id: '1',
      description: 'La historia de J. Robert Oppenheimer, el físico detrás de la bomba atómica.',
      genre: 'Drama',
      director: 'Christopher Nolan',
      releaseYear: 2023,
      rating: 8.9,
      images: [],
      cast: [],
      duration: '3:00',
      tags: [],
      votes: 0
    },
    {
      title: 'Dune: Parte 2',
      mainImage: 'https://i.postimg.cc/PqzWx4K6/Dune-Part-2.jpg',
      id: '1',
      description: 'Paul Atreides continúa su camino en el desierto de Arrakis.',
      genre: 'Ciencia Ficción',
      director: 'Denis Villeneuve',
      releaseYear: 2024,
      rating: 9.0,
      images: [],
      duration: '2:45',
      tags: [],
      cast: [],
      votes: 0
    },
    {
      title: 'The Batman',
      mainImage: 'https://i.postimg.cc/mZ6QthNG/Batman-Courtesy-of-DC-Comics.jpg',
      id: '1',
      description: 'Bruce Wayne enfrenta un nuevo desafío en Gotham City.',
      genre: 'Acción',
      director: 'Matt Reeves',
      releaseYear: 2022,
      rating: 8.3,
      duration: '2:56',
      tags: [],
      cast: [],
      images: [],
      votes: 0
    }
  ];

  upcomingMovies: Movie[] = [
    {
      title: 'Joker 2',
      duration: '2:35',
      mainImage: 'https://i.postimg.cc/mZ6QthNG/Batman-Courtesy-of-DC-Comics.jpg',
      id: '1',
      description: '',
      genre: '',
      director: '',
      cast: [],
      tags: [],
      rating: 0,
      images: [],
      releaseYear: 0,
      votes: 0
    },
    {
      title: 'Avatar 3',
      duration: '3:00',
      mainImage: 'https://i.postimg.cc/mZ6QthNG/Batman-Courtesy-of-DC-Comics.jpg',
      id: '1',
      description: '',
      genre: '',
      director: '',
      releaseYear: 2025,
      rating: 0,
      images: [],
      cast: [],
      tags: [],
      votes: 0
    },
    {
      title: 'Deadpool 3',
      duration: '2:15',
      mainImage: 'https://i.postimg.cc/mZ6QthNG/Batman-Courtesy-of-DC-Comics.jpg',
      id: '1',
      description: '',
      genre: '',
      director: '',
      releaseYear: 2024,
      rating: 0,
      images: [],
      cast: [],
      tags: [],
      votes: 0
    },

  ];

  featuredMovieIndex = 0;
  featuredMovie: Movie = this.featuredMovies[this.featuredMovieIndex];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {}

  prevMovie(): void {
    this.featuredMovieIndex = (this.featuredMovieIndex - 1 + this.featuredMovies.length) % this.featuredMovies.length;
    this.featuredMovie = this.featuredMovies[this.featuredMovieIndex];
  }

  nextMovie(): void {
    this.featuredMovieIndex = (this.featuredMovieIndex + 1) % this.featuredMovies.length;
    this.featuredMovie = this.featuredMovies[this.featuredMovieIndex];
  }
}

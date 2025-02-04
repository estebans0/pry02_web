// src/app/services/movie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../components/shared/models/movie.model';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:4000/api/movies';

  constructor(private http: HttpClient) {}

  // private movies: Movie[] = [
  //   {
  //     id: '1',
  //     title: 'Batman',
  //     description: 'El Caballero Oscuro de Gotham City comienza su guerra contra el crimen...',
  //     genre: 'Acción, Aventura',
  //     director: 'Tim Burton',
  //     duration: '2:06',
  //     releaseYear: 1989,
  //     rating: 7.5,
  //     tags: ['Action Epic', 'Superhero', 'Tragedy', 'Urban Adventure'],
  //     mainImage: 'https://i.postimg.cc/7ZJXx0pc/Oppenheimer-Christopher-Nolan-0-1-width-1024-Kh9-HV7-C.jpg',
  //     cast: [
  //       { id: '101', name: 'Michael Keaton' },
  //       { id: '102', name: 'Jack Nicholson' },
  //       { id: '103', name: 'Kim Basinger' }
  //     ],
  //     images: ['https://i.postimg.cc/7ZJXx0pc/Oppenheimer-Christopher-Nolan-0-1-width-1024-Kh9-HV7-C.jpg', 'https://i.postimg.cc/7ZJXx0pc/Oppenheimer-Christopher-Nolan-0-1-width-1024-Kh9-HV7-C.jpg', 'https://i.postimg.cc/7ZJXx0pc/Oppenheimer-Christopher-Nolan-0-1-width-1024-Kh9-HV7-C.jpg'],
  //     votes: 0
  //   }
  // ];

  /**
   * Lista las películas desde el backend con filtros/paginación
   * Ejemplo de uso de query params:
   * GET /api/movies?page=1&limit=10&title=batman
   */
  getMovies(
    page = 1, 
    limit = 10, 
    title = '', 
    sort = '', 
    genre = '', 
    year = '', 
    rating = ''
  ): Observable<any> {
    let url = `${this.apiUrl}?page=${page}&limit=${limit}`;
    if (title) url += `&title=${title}`;
    if (sort) url += `&sort=${sort}`;
    if (genre) url += `&genre=${genre}`;
    if (year) url += `&year=${year}`;
    if (rating) url += `&rating=${rating}`;
    return this.http.get<any>(url);
  }

  /**
   * Devuelve el detalle de la película
   */
  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea una película (requiere token y ser admin)
   */
  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie);
  }

  /**
   * Actualiza una película (requiere token y ser admin)
   */
  updateMovie(id: string, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/${id}`, movie);
  }

  /**
   * Elimina una película (requiere token y ser admin)
   */
  deleteMovie(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

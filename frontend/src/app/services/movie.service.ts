import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../components/shared/models/movie.model';
import { Observable, of } from 'rxjs'; 


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:5000/api/movies';

  constructor(private http: HttpClient) {}


  private movies: Movie[] = [
    {
      id: '1',
      title: 'Batman',
      description: 'El Caballero Oscuro de Gotham City comienza su guerra contra el crimen...',
      genre: 'Acción, Aventura',
      director: 'Tim Burton',
      duration: '2:06',
      releaseYear: 1989,
      rating: 7.5,
      tags: ['Action Epic', 'Superhero', 'Tragedy', 'Urban Adventure'],
      mainImage: 'https://i.postimg.cc/7ZJXx0pc/Oppenheimer-Christopher-Nolan-0-1-width-1024-Kh9-HV7-C.jpg',
      cast: [
        { id: '101', name: 'Michael Keaton' },
        { id: '102', name: 'Jack Nicholson' },
        { id: '103', name: 'Kim Basinger' }
      ],
      images: ['https://i.postimg.cc/7ZJXx0pc/Oppenheimer-Christopher-Nolan-0-1-width-1024-Kh9-HV7-C.jpg', 'https://i.postimg.cc/7ZJXx0pc/Oppenheimer-Christopher-Nolan-0-1-width-1024-Kh9-HV7-C.jpg', 'https://i.postimg.cc/7ZJXx0pc/Oppenheimer-Christopher-Nolan-0-1-width-1024-Kh9-HV7-C.jpg'],
      votes: 0
    }
  ];


  getMovieById(id: string): Observable<Movie> {
    const movie = this.movies.find(m => m.id === id);
    return of(movie as Movie);
  }
  

  getMovies(): Observable<Movie[]> {
    return of(this.movies); // Devuelve un array de películas
  }
  


  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie);
  }

  updateMovie(id: string, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/${id}`, movie);
  }

  deleteMovie(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

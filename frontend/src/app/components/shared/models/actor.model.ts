import { Movie } from './movie.model';

export interface Actor {
  id?: string;
  name: string;
  birthDate: Date;
  biography: string;
  images: string[];
  mainImage: string;
  movies: Movie[];
}
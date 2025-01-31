import { Actor } from './actor.model';
import { MovieActor } from './movie-actor.model';

export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string;
  director: string;
  releaseYear: number;
  rating: number;
  duration: string;
  tags: string[];
  images: string[];
  mainImage: string;
  cast: MovieActor[]; // Enlace a actores simplificados
  votes: number;
}

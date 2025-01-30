import { Actor } from './actor.model';

export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string;
  director: string;
  releaseYear: number;
  rating: number;
  images: string[];
  mainImage: string;
  cast: Actor[];
}
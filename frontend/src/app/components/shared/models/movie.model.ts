export interface MovieCast {
  actor: {
    id: string;
    name: string;
    mainImage: string;
  };
  characterName: string;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string[];  // backend stores genre as an array
  director: string;
  releaseYear: number;
  rating: number;
  duration: string;
  tags: string[];
  images: string[];
  mainImage: string;
  cast: MovieCast[];
  votes: number;
}

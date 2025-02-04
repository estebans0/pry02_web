export interface Actor {
  id?: string;
  name: string;
  birthDate: Date;
  biography: string;
  images: string[];
  mainImage: string;
  movies: any[]; // or a more detailed Movie interface if desired
}

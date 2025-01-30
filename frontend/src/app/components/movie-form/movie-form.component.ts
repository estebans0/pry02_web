import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { ActorService } from '../../services/actor.service';
import { Movie } from '../../models/movie.model';
import { Actor } from '../../models/actor.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class MovieFormComponent implements OnInit {
  movie: Movie = {
    title: '',
    description: '',
    genre: '',
    director: '',
    releaseYear: 0,
    rating: 0,
    images: [],
    mainImage: '',
    cast: [],
    id: ''
  };
  actors: Actor[] = [];
  selectedActors: string[] = [];
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private actorService: ActorService
  ) {}

  ngOnInit(): void {
    this.loadActors();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loadMovie(id);
    }
  }

  loadActors(): void {
    this.actorService.getActors().subscribe(
      (actors) => this.actors = actors,
      (error) => console.error('Error fetching actors', error)
    );
  }

  loadMovie(id: string): void {
    this.movieService.getMovie(id).subscribe(
      (movie) => {
        this.movie = movie;
        this.selectedActors = movie.cast.map(actor => actor.id).filter((id): id is string => id !== undefined);
      },
      (error) => console.error('Error fetching movie', error)
    );
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.movie.mainImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    this.movie.cast = this.selectedActors.map(id => ({ id } as Actor));
    if (this.isEditing) {
      this.movieService.updateMovie(this.movie.id, this.movie).subscribe(
        () => this.router.navigate(['/movies', this.movie.id]),
        (error) => console.error('Error updating movie', error)
      );
    } else {
      this.movieService.createMovie(this.movie).subscribe(
        (newMovie) => this.router.navigate(['/movies', newMovie.id]),
        (error) => console.error('Error creating movie', error)
      );
    }
  }
}
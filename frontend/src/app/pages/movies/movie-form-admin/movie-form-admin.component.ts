import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { ActorService } from '../../../services/actor.service';
import { Movie, MovieCast } from '../../../components/shared/models/movie.model';
import { Actor } from '../../../components/shared/models/actor.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form-admin.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class MovieFormComponent implements OnInit {
  movie: Movie = {
    id: '',
    title: '',
    description: '',
    genre: [],
    director: '',
    releaseYear: 0,
    rating: 0,
    duration: '',
    tags: [],
    images: [],
    mainImage: '',
    cast: [],
    votes: 0
  };
  // A helper field to input genres as a comma‑separated string.
  genreInput: string = '';
  actors: Actor[] = [];
  isEditing = false;

  // For dynamically adding cast members:
  newCastActorId: string = '';
  newCharacterName: string = '';

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
      (res) => this.actors = res.actors || res,
      (error) => console.error('Error fetching actors', error)
    );
  }

  loadMovie(id: string): void {
    this.movieService.getMovieById(id).subscribe(
      (movie) => {
        this.movie = movie;
        // If the genre field is an array, join it to a comma‐separated string for display.
        this.genreInput = movie.genre.join(', ');
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

  onMultipleFilesSelected(event: any): void {
    const files: FileList = event.target.files;
    const images: string[] = [];
    let loaded = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        images.push(e.target.result);
        loaded++;
        if (loaded === files.length) {
          this.movie.images = images;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  addCastMember(): void {
    if (this.newCastActorId && this.newCharacterName) {
      const actor = this.actors.find(a => a.id === this.newCastActorId);
      if (actor) {
        const newCast: MovieCast = {
          actor: {
            id: actor.id!,
            name: actor.name,
            mainImage: actor.mainImage || ''
          },
          characterName: this.newCharacterName
        };
        this.movie.cast.push(newCast);
        this.newCastActorId = '';
        this.newCharacterName = '';
      }
    }
  }

  removeCastMember(index: number): void {
    this.movie.cast.splice(index, 1);
  }

  onSubmit(): void {
    // Process the genre input into an array (trim spaces and split by comma)
    this.movie.genre = this.genreInput.split(',').map(g => g.trim()).filter(g => g);

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

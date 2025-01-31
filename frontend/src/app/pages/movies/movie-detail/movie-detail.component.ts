import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  imports: [CommonModule, RouterModule],
})
export class MovieDetailComponent implements OnInit {
  movie: any = null;
  isAdmin = true; // Simulación de administrador para mostrar los botones

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadMovie(id);
    }
  }

  loadMovie(id: string): void {
    // Simulación de datos sin backend
    this.movie = {
      id: id,
      title: 'Inception',
      mainImage: 'https://i.postimg.cc/7ZJXx0pc/Oppenheimer-Christopher-Nolan-0-1-width-1024-Kh9-HV7-C.jpg',
      releaseYear: 2010,
      genre: 'Ciencia Ficción',
      director: 'Christopher Nolan',
      rating: 8.8,
      description: 'Un ladrón que entra en los sueños de las personas para robar secretos corporativos.',
      cast: [
        { id: '1', name: 'Leonardo DiCaprio' },
        { id: '2', name: 'Joseph Gordon-Levitt' },
        { id: '3', name: 'Elliot Page' }
      ]
    };
  }

  editMovie(): void {
    this.router.navigate(['/movies', this.movie.id, 'edit']);
  }

  deleteMovie(): void {
    if (confirm('¿Estás seguro de eliminar esta película?')) {
      this.router.navigate(['/movies']);
    }
  }
}

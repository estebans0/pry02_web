import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ActorService } from '../../../services/actor.service';
import { AuthService } from '../../../services/auth.service';
import { Actor } from '../../../components/shared/models/actor.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class ActorDetailComponent implements OnInit {
  actor: Actor | null = null;
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private actorService: ActorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadActor(id);
    }
    this.authService.isAdmin$.subscribe(isAdmin => (this.isAdmin = isAdmin));
  }

  loadActor(id: string): void {
    this.actorService.getActor(id).subscribe({
      next: (actor) => (this.actor = actor),
      error: (error) => console.error('Error fetching actor', error)
    });
  }

  editActor(): void {
    if (!this.actor || !this.actor.id) return;
    this.router.navigate(['/actors', this.actor.id, 'edit']);
  }

  deleteActor(): void {
    if (this.actor && this.actor.id && confirm('¿Estás seguro de que quieres eliminar este actor?')) {
      this.actorService.deleteActor(this.actor.id).subscribe({
        next: () => this.router.navigate(['/actors']),
        error: (error) => console.error('Error deleting actor', error)
      });
    }
  }
}

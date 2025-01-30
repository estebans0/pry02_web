import { Component, OnInit } from '@angular/core';
import { ActorService } from '../../services/actor.service';
import { AuthService } from '../../services/auth.service';
import { Actor } from '../../models/actor.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule]
})
export class ActorListComponent implements OnInit {
  actors: Actor[] = [];
  filteredActors: Actor[] = [];
  searchTerm = '';
  isAdmin = false;

  constructor(
    private actorService: ActorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadActors();
    this.authService.isAdmin$.subscribe(isAdmin => this.isAdmin = isAdmin);
  }

  loadActors(): void {
    this.actorService.getActors().subscribe(
      (actors) => {
        this.actors = actors;
        this.filteredActors = actors;
      },
      (error) => console.error('Error fetching actors', error)
    );
  }

  search(): void {
    this.filteredActors = this.actors.filter(actor =>
      actor.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
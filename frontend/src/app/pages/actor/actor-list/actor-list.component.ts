import { Component, OnInit } from '@angular/core';
import { ActorService } from '../../../services/actor.service';
import { AuthService } from '../../../services/auth.service';
import { Actor } from '../../../components/shared/models/actor.model';
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
  searchTerm = '';
  isAdmin = false;

  // Pagination controls
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  constructor(
    private actorService: ActorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadActors();
    this.authService.isAdmin$.subscribe(isAdmin => this.isAdmin = isAdmin);
  }

  loadActors(page: number = this.currentPage): void {
    this.actorService.getActors(page, this.pageSize, this.searchTerm).subscribe({
      next: (res) => {
        // Expecting backend to return an object with keys: actors, page, pages
        this.actors = res.actors;
        this.currentPage = res.page;
        this.totalPages = res.pages;
      },
      error: (error) => console.error('Error fetching actors', error)
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadActors(this.currentPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadActors(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadActors(this.currentPage);
    }
  }
}

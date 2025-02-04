import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorService } from '../../../services/actor.service';
import { Actor } from '../../../components/shared/models/actor.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ActorFormComponent implements OnInit {
  actor: Actor = {
    id: '',
    name: '',
    birthDate: new Date(),
    biography: '',
    images: [],
    mainImage: '',
    movies: []
  };
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private actorService: ActorService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loadActor(id);
    }
  }

  loadActor(id: string): void {
    this.actorService.getActor(id).subscribe({
      next: (actor) => (this.actor = actor),
      error: (err) => console.error('Error fetching actor', err)
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.actor.mainImage = e.target.result;
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
          this.actor.images = images;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.actorService.updateActor(this.actor.id!, this.actor).subscribe({
        next: () => this.router.navigate(['/actors', this.actor.id]),
        error: (err) => console.error('Error updating actor', err)
      });
    } else {
      this.actorService.createActor(this.actor).subscribe({
        next: (newActor) => this.router.navigate(['/actors', newActor.id]),
        error: (err) => console.error('Error creating actor', err)
      });
    }
  }
}

import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { ActorListComponent } from './components/actor-list/actor-list.component';
import { ActorDetailComponent } from './components/actor-detail/actor-detail.component';
import { ActorFormComponent } from './components/actor-form/actor-form.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/new', component: MovieFormComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: 'movies/:id/edit', component: MovieFormComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'actors', component: ActorListComponent },
  { path: 'actors/new', component: ActorFormComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'actors/:id', component: ActorDetailComponent },
  { path: 'actors/:id/edit', component: ActorFormComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
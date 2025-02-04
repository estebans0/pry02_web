import { Routes } from '@angular/router';
import { MovieListComponent } from './pages/movies/movie-list/movie-list.component';
import { MovieDetailComponent } from './pages/movies/movie-detail/movie-detail.component';
import { MovieFormComponent } from './pages/movies/movie-form-admin/movie-form-admin.component';
import { ActorListComponent } from './pages/actor/actor-list/actor-list.component';
import { ActorDetailComponent } from './pages/actor/actor-detail/actor-detail.component';
import { ActorFormComponent } from './pages/actor/actor-form/actor-form.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { HomePage } from './pages/home/home.pages';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'home', component: HomePage },
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/:id', component: MovieDetailComponent, canActivate: [AuthGuard] },
  { path: 'movies/new', component: MovieFormComponent, canActivate: [AdminGuard] },
  { path: 'movies/:id/edit', component: MovieFormComponent, canActivate: [AdminGuard] },
  { path: 'actors', component: ActorListComponent },
  { path: 'actors/:id', component: ActorDetailComponent, canActivate: [AuthGuard] },
  { path: 'actors/new', component: ActorFormComponent, canActivate: [AdminGuard] },
  { path: 'actors/:id/edit', component: ActorFormComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];

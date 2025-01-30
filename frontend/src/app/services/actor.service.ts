import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actor } from '../components/shared/models/actor.model';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private apiUrl = `http://localhost:4000/api/auth/actors`;

  constructor(private http: HttpClient) {}

  getActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(this.apiUrl);
  }

  getActor(id: string): Observable<Actor> {
    return this.http.get<Actor>(`${this.apiUrl}/${id}`);
  }

  createActor(actor: Actor): Observable<Actor> {
    return this.http.post<Actor>(this.apiUrl, actor);
  }

  updateActor(id: string, actor: Actor): Observable<Actor> {
    return this.http.put<Actor>(`${this.apiUrl}/${id}`, actor);
  }

  deleteActor(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
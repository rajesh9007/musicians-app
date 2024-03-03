import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Musician } from './musician.model';

@Injectable({
  providedIn: 'root',
})
export class MusicianService {
  private apiUrl = 'http://localhost:3000/musicians';

  constructor(private http: HttpClient) {}

  getMusicians(): Observable<Musician[]> {
    return this.http.get<Musician[]>(this.apiUrl);
  }

  addMusician(musician: Musician): Observable<Musician> {
    return this.http.post<Musician>(this.apiUrl, musician);
  }

  updateMusician(id: string, musician: Musician): Observable<Musician> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Musician>(url, musician);
  }

  deleteMusician(musicianId: string | undefined): Observable<any> {
    const url = `${this.apiUrl}/${musicianId}`;
    return this.http.delete(url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from './event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http: HttpClient) {
  }

  getAllMatches(): Observable<Match[]> {
    return this.http.get<Match[]>('/api/match');
  }

  save(match: Match): Observable<Match> {
    if(match.id) {
      return this.http.put<Match>('/api/match/'+match.id, match);
    } else {
      return this.http.post<Match>('/api/match', match);
    }
  }

  delete(id: string) {
    return this.http.delete<Match>('/api/match/'+id);
  }
}

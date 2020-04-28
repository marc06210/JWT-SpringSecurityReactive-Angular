import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from './team';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('/api/team');
  }

  get(id:string): Observable<Team> {
    return this.http.get<Team>('/api/team/'+id);
  }

  delete(id:string): Observable<Team> {
    return this.http.delete<Team>('/api/team/'+id);
  }

  save(team: Team): Observable<any> {
    if(team.id) {
      return this.http.put('/api/team/'+team.id, team);
    } else {
      return this.http.post('/api/team', team);
    }
  }
}

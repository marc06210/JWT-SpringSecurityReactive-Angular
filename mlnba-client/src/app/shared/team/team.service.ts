import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team, TeamGroup } from './team';
import { Training } from './training';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Team[]> {
    return this.http.get<Team[]>('/api/team');
  }

  getAllCategories(): Observable<TeamGroup[]> {
    return this.http.get<TeamGroup[]>('/api/team-category');
  }

  getCategoryById(id:string): Observable<Team> {
    return this.http.get<Team>('/api/team-category/'+id);
  }

  delete(id:string): Observable<Team> {
    return this.http.delete<Team>('/api/team-category/'+id);
  }

  saveCategory(team: TeamGroup): Observable<TeamGroup> {
    if(team.id) {
      return this.http.put<TeamGroup>('/api/team-category/'+team.id, team);
    } else {
      return this.http.post<TeamGroup>('/api/team-category', team);
    }
  }

  saveTeam(team: Team): Observable<Team> {
    if(team.id) {
      return this.http.put<Team>('/api/team/'+team.id, team);
    } else {
      return this.http.post<Team>('/api/team', team);
    }
  }

  addTraining(idTeam:string, training: Training) {
    return this.http.post('/api/team/'+idTeam+'/training', training);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Team } from '../models/team.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TeamService {

  constructor(private http:HttpClient) {}

    private teamUrl = '/api/team';

    public getTeams() {
      return this.http.get<Team[]>(this.teamUrl);
    }

    public getTeam(id: string) {
      return this.http.get<Team[]>(this.teamUrl + "/" + id);
    }

    public deleteTeam(team: Team) {
      return this.http.delete(this.teamUrl + "/" + team.id);
    }

    public createTeam(team: Team) {
      return this.http.post<Team>(this.teamUrl, team);
    }

    public updateTeam(team: Team) {
      return this.http.put<Team>(this.teamUrl + "/" + team.id, team);
    }

}
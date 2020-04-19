import { Component, OnInit } from '@angular/core';
import { TeamService } from '../shared/team/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teams: Array<any>;

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.teamService.getAll().subscribe(data => {
      this.teams = data;
    });
  }

}

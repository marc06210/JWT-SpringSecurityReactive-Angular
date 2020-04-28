import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../shared/team/team.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Team } from '../shared/team/team';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {

  team: Team = new Team();

  sub: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.teamService.get(id).subscribe((team: any) => {
          if (team) {
            this.team = team;
            //this.teams.href = car._links.self.href;
            //this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
          } else {
            console.log(`Team with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/team-list']);
  }

  save() {
    this.teamService.save(this.team).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
/*
  remove(href) {
    this.teamService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
*/
}

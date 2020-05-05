import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../shared/team/team.service';
import { Subscription } from 'rxjs';
import { Team } from '../shared/team/team';
import { Training } from '../shared/team/training';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  team: Team = new Team();

  sub: Subscription;

  displayedColumns: string[] = ['day', 'fromTime', 'toTime', 'action'];
  dataSource: Training[];

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
            this.dataSource = this.team.trainings;
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

  loadData() {
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/team-list']);
  }

  onDeleteRow(i) {
    this.team.trainings.splice(i, 1);
    this.teamService.save(this.team).subscribe(result => {
      this.table.renderRows();
    }, error => console.error(error));
  }

  onSaveRow(row: Training) {
    this.teamService.addTraining(this.team.id, row).subscribe(result => {
      row.temp = false;
      this.table.renderRows();
    }, error => console.error(error));;
  }

  save() {
    this.teamService.save(this.team).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  addTraining() {
    var t: Training = new Training();
    t.temp = true;
    this.team.trainings.push(t);
    this.table.renderRows();
  }

  isNew(elt:Training) {
    return elt.temp==true;
  }

  isFull(elt:Training) {
    return elt.day!=null && elt.day.trim().length>0 
      && elt.fromTime!=null && elt.fromTime.trim().length>0 
      && elt.toTime!=null && elt.toTime.trim().length>0;
  }

/*
  remove(href) {
    this.teamService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
*/
}
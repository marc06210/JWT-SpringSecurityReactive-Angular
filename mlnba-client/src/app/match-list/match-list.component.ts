import { Component, OnInit } from '@angular/core';
import { EventDataSource } from '../shared/event/EventDataSource';
import { EventService } from '../shared/event/event.service';
import { MatDialog } from '@angular/material/dialog';
import { MatchEditComponent } from '../match-edit/match-edit.component';
import { Team } from '../shared/team/team';
import { Match } from '../shared/event/event';
import * as moment from 'moment';
import { TeamService } from '../shared/team/team.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  teams :Team[] = [];
  displayedColumns: string[] = ['date', 'localTeam', 'opponent', 'place', 'action'];
  dataSource: EventDataSource;

  constructor(private app: AppService, private eventService: EventService, private teamService: TeamService, public dialog: MatDialog) { }

  ngOnInit() {
    moment.locale('fr');
    this.loadMatches();
    this.teamService.getAll().subscribe(result => this.teams = result);
  }

  loadMatches() {
    this.dataSource = new EventDataSource(this.eventService);
    this.dataSource.loadEvents();
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  getMatchTime(m : Match) {
    let d1 = moment(m.date);
    return d1.format("ll") + " à " + m.time;
  }

  isAdmin(): boolean {
    return this.app.isAdmin();
  }

  onAddMatch() {
    console.log("onAddMatch");
      const dialogRef = this.dialog.open(MatchEditComponent, {
        width: '300px',
        data: {'teams' : this.teams, 'inputMatch': new Team()} 
      });
  
      dialogRef.afterClosed().subscribe(result=> {
        console.log('The dialog was closed: ' + result.localTeam.id);
        this.eventService.save(result).subscribe( result => {
          this.loadMatches();
        });
      });
    
  }
  onDeleteMatch(match) {
    console.log("onDeleteMatch - " + match);
    this.eventService.delete(match.id).subscribe(result => this.loadMatches());
  }
  onModifyMatch(match :Match) {
    console.log("onModifyMatch - " + match);

    const dialogRef = this.dialog.open(MatchEditComponent, {
      width: '300px',
      data: {'teams' : this.teams, 'inputMatch': match} 
    });

    dialogRef.afterClosed().subscribe(result=> {
      console.log('The dialog was closed: ' + result.localTeam.id);
      this.eventService.save(result).subscribe( result => {
        this.loadMatches();
      });
    });
  }
}

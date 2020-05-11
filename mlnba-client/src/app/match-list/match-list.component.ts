import { Component, OnInit } from '@angular/core';
import { EventDataSource } from '../shared/event/EventDataSource';
import { EventService } from '../shared/event/event.service';
import { MatDialog } from '@angular/material/dialog';
import { MatchEditComponent } from '../match-edit/match-edit.component';
import { Team } from '../shared/team/team';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  displayedColumns: string[] = ['date', 'match', 'action'];
  dataSource: EventDataSource;

  constructor(private eventService: EventService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadMatches();
  }

  loadMatches() {
    this.dataSource = new EventDataSource(this.eventService);
    this.dataSource.loadEvents();
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  onAddMatch() {
    console.log("onAddMatch");
    let t1: Team = new Team();
    t1.id = '5eb657c215544e7f47af4604';
    t1.name = 'U11F';
    let t2: Team = new Team();
    t2.id = '2';
    t2.name = 'U15M1';

      const dialogRef = this.dialog.open(MatchEditComponent, {
        width: '300px',
        data: {'teams' : [t1, t2]} 
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
  onModifyMatch(match) {
    console.log("onModifyMatch - " + match);
  }
}

import { Component, OnInit } from '@angular/core';
import { TeamService } from '../shared/team/team.service';
import { AppService } from '../app.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { Team, TeamGroup } from '../shared/team/team';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teams: Array<any>;
  teamGroups: Array<TeamGroup>;
  
  constructor(private app: AppService, private teamService: TeamService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadTeams();
  }

  loadTeams() {
    /*
    this.teamService.getAll().subscribe(data => {
      this.teams = data;
      console.log(this.teams);
    });*/

    this.teamService.getAllCategories().subscribe( tg => {
      this.teamGroups = tg;
    })
  }

  getName(tg: TeamGroup) {
    let suffix = ' M';
    if('FEMALE'.localeCompare(tg.gender)==0) {
      suffix = ' F';
    }
    return tg.name + suffix;
  }

  isAdmin(): boolean {
    return this.app.isAdmin();
  }

  delete(team: Team) {
    console.log('delete ' + team.id + "/" + team.name);
 
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Voulez vous vraiment supprimer l'équipe " + team.name + "?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.teamService.delete(team.id).subscribe(response => this.loadTeams());
      }
    });
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


import { Team } from '../models/team.model';
import { TeamService } from './team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  teams: Team[];
  selectedTeam : Team;
  dialog: MatDialog

  columnsToDisplay = ['select', 'name', 'season', 'description', 'count'];
  selection = new SelectionModel<Team>(false, []);

  constructor(private router: Router, private teamService: TeamService, public dialogi: MatDialog) {
    this.dialog = dialogi;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.teams.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.teams.forEach(row => this.selection.select(row));
  }

  ngOnInit() {
    this.listTeams();
  };

  listTeams() {
    this.teamService.getTeams()
    .subscribe( data => {
      this.teams = data;
      this.selectedTeam = null;
      console.log('retrieved ' + this.teams.length + ' teams');
    });
  }

  deleteUser(team: Team): void {
    this.teamService.deleteTeam(team)
      .subscribe( data => {
        this.listTeams();
      })
  };

  saveUser(): void {
    if(this.selectedTeam.id==null) {
      this.teamService.createTeam(this.selectedTeam)
        .subscribe( data => {
          this.listTeams();
        });
    } else {
      this.teamService.updateTeam(this.selectedTeam)
        .subscribe( data => {
          this.listTeams();
        });
    }
  };

  selectTeam(team: Team): void {
    this.selectedTeam = team;
  };

  selectRow(team): void {
    if(this.selection.selected.length==0) {
      this.selectedTeam = null;
    } else {
      this.selectedTeam = team;
    }
  };

  create(): void {
    this.selectedTeam = new Team;
    this.selection.clear();
    this.openDialog();
  };

  openDialog() {
    const dialogRef = this.dialog.open(TeamDialog, {
      data: Object.assign({}, this.selectedTeam)
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=null) {
        console.log('The dialog was closed: ' + result.name + '/' + this.selectedTeam.name);
        this.selectedTeam = result;
        this.saveUser();

      } else {
        console.log('action canceled');
        this.selectedTeam = null;
        this.selection.clear()
      }
    });
  }

}

@Component({
  selector: 'team-dialog',
  templateUrl: './team-dialog.html',
})
export class TeamDialog {

  constructor(public dialogRef: MatDialogRef<TeamDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Team) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


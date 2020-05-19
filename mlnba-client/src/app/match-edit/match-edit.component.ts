import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Team } from '../shared/team/team';
import { Match } from '../shared/event/event';

export class MatchInputData{

  inputMatch: Match;
  teams: Team[];

}

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'DD MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MMMM YYYY',
  },
};

@Component({
  selector: 'app-match-edit',
  templateUrl: './match-edit.component.html',
  styleUrls: ['./match-edit.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class MatchEditComponent {

  PLACES :string[] = ['Olympie', 'Camus', 'Mimosas', 'Extérieur'];
  match :Match = new Match();

  constructor(public dialogRef: MatDialogRef<MatchEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatchInputData) {
      if(data.inputMatch.localTeam==null) {
        data.inputMatch.localTeam = new Team();
      }
  }

  save() {
    console.log('save');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

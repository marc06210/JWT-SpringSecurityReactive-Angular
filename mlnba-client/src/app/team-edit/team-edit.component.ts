import { Component, OnInit, Inject, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../shared/team/team.service';
import { Subscription } from 'rxjs';
import { Team, TeamGroup } from '../shared/team/team';
import { Training } from '../shared/team/training';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChildren('cmp') components:QueryList<MatTable<any>>;

  team: TeamGroup = new TeamGroup();

  sub: Subscription;

  displayedColumns: string[] = ['day', 'fromTime', 'toTime', 'action'];
  dataSource: Training[];

  DAYS: string[] = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService,
    public dialog: MatDialog,
    private snack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.teamService.getCategoryById(id).subscribe((team: any) => {
          if (team) {
            this.team = team;
            //this.dataSource = this.team.trainings;
          } else {
            console.log(`Team with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      } else {
        this.team.gender = 'MALE';
        let t: Team = new Team();
        t.name = "1";
        t.trainings = [];
        this.team.teams = [t];
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

  onDeleteRow(i, team: Team) {
    /*
    this.team.trainings.splice(i, 1);
    this.teamService.save(this.team).subscribe(result => {
      this.table.renderRows();
    }, error => console.error(error));*/
  }

  onSaveRow(row: Training, team: Team) {
    this.teamService.addTraining(team.id, row).subscribe(result => {
      row.temp = false;
      this.table.renderRows();
    }, error => console.error(error));
  }

  isMale() {
    let res: boolean = ('MALE'.localeCompare(this.team.gender)==0);
    console.log('isMale =>' + this.team.gender + '-' + res);
    return res;
  }

  clickGender(gender: string) {
    this.team.gender = gender;
  }

  addGroup() {
    let t = new Team();
    let i: number = this.team.teams.length+1;
    t.name = ''+i;
    this.team.teams.push(t);
    console.log(this.team.teams.length);
  }

  save() {
    //if(this.team.id==null) {
    //  console.log("create full category");

      this.teamService.saveCategory(this.team)
        .subscribe(categoryWithId => {
          this.team.id = categoryWithId.id;
          console.log('category created: ' + this.team.id);
          this.snack.open('Equipe ' + this.team.name + ' enregistrée', null, {
            duration: 3000
          });
          /*this.team.teams.forEach( t => {
            this.teamService.saveTeam(t).subscribe( team => {
              t.id = team.id;
              console.log('team created: ' + t.id);
              this.teamService.saveCategory(this.team);
              t.trainings.forEach(training => {
                this.teamService.addTraining(t.id, training);
                console.log('training created');
                training.temp = false;
              });
            } );
          });*/
          
        })

    //} else {
    //  console.log("update category");

    //}
    /*
    this.teamService.saveCategory(this.team).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));*/
  }

  addTraining(team: Team) {
    var t: Training = new Training();
    t.temp = true;
    team.trainings.push(t);
    this.components.forEach(element => { element.renderRows(); });
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
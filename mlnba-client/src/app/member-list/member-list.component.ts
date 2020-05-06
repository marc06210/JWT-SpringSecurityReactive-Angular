import { Component, OnInit, ViewChild } from '@angular/core';
import { MemberService } from '../shared/member/member.service';
import { MemberDataSource } from '../shared/member/MemberDataSource';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Member } from '../shared/member/member';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  
  unauthorized = false;
  members: Array<any>;

  toppings = new FormControl();

  rolesList: string[] = ["role_admin", "role_player", "role_coach"];

  displayedColumns: string[] = ['username', 'lastname', 'firstname', 'roles', 'action'];
  dataSource: MemberDataSource;

  constructor(private memberService: MemberService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.unauthorized = false;
    this.memberService.getAll().subscribe(data => {
      this.members = data;
    });

    this.dataSource = new MemberDataSource(this.memberService);
    this.dataSource.loadMembers(this);
  }

  onDeleteRow(member: Member) {
    console.log('delete: ' + member.username);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Voulez vous vraiment supprimer l'utilisateur " + member.firstname + " " + member.lastname + "?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.memberService.delete(member.id).subscribe(response => this.loadMembers());
      }
    });
    
  }

}

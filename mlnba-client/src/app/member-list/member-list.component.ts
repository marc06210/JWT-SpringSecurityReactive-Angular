import { Component, OnInit, ViewChild } from '@angular/core';
import { MemberService } from '../shared/member/member.service';
import { MemberDataSource } from '../shared/member/MemberDataSource';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Member } from '../shared/member/member';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  unauthorized = false;
  members: Array<Member>;
  sortedMembers: Array<Member>;

  rolesList: string[] = ["role_admin", "role_player", "role_coach"];

  displayedColumns: string[] = ['lastname', 'firstname', 'roles', 'action'];
  dataSource;//: MemberDataSource;
  
  constructor(private memberService: MemberService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.unauthorized = false;
    
    this.memberService.getAll().subscribe(data => {
      this.members = data;
      this.sortedMembers = this.members.slice();
      this.dataSource = new MatTableDataSource(this.sortedMembers);
    });
/*
    // see here to inject sort in the DataSource
    this.dataSource = new MemberDataSource(this.memberService);
    this.dataSource.loadMembers(this);*/
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

  sortData(sort: Sort) {
    console.log("sortData: " + sort);
    const data = this.members.slice();
    if (!sort.active || sort.direction === '') {

      this.sortedMembers = data;
      this.dataSource = new MatTableDataSource(this.sortedMembers);

      return;
    }

    this.sortedMembers = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'lastname': return this.compare(a.lastname, b.lastname, isAsc);
        case 'firstname': return this.compare(a.firstname, b.firstname, isAsc);
        /*case 'fat': return compare(a.fat, b.fat, isAsc);
        case 'carbs': return compare(a.carbs, b.carbs, isAsc);
        case 'protein': return compare(a.protein, b.protein, isAsc);
        default: return 0;*/
      }
    });

    this.dataSource = new MatTableDataSource(this.sortedMembers);

    this.sortedMembers.forEach(m => console.log(">>> " + m.firstname));
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  hasRole(member: Member, role: string) {
    return member.roles.includes(role);
  }

}

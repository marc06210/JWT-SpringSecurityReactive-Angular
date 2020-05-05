import { Component, OnInit, ViewChild } from '@angular/core';
import { MemberService } from '../shared/member/member.service';
import { MemberDataSource } from '../shared/member/MemberDataSource';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

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

  constructor(private memberService: MemberService) { }

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.unauthorized = false;
    this.memberService.getAll().subscribe(data => {
      this.members = data;
      //this.dataSource = data;
    });

    this.dataSource = new MemberDataSource(this.memberService);
    this.dataSource.loadMembers(this);
  }

  onDeleteRow(row) {
    console.log('delete: ' + row);
    this.memberService.delete(row).subscribe(response => this.loadMembers());
  }

}

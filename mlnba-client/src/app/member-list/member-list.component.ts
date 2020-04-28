import { Component, OnInit } from '@angular/core';
import { MemberService } from '../shared/member/member.service';
import { MemberDataSource } from '../shared/member/MemberDataSource';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  unauthorized = false;
  members: Array<any>;

  displayedColumns: string[] = ['username', 'lastname', 'firstname'];
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

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }
}

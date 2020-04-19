import { Component, OnInit } from '@angular/core';
import { MemberService } from '../shared/member/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Array<any>;

  constructor(private memberService: MemberService) { }

  ngOnInit() {
    this.memberService.getAll().subscribe(data => {
      this.members = data;
    });
  }

}

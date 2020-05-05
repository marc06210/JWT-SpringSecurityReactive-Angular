import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../shared/member/member';
import { MemberService } from '../shared/member/member.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  member: Member = new Member();
  sub: Subscription;
  isNew: boolean = true;
  rolesList: string[] = ["role_admin", "role_player", "role_coach"];
  roles = ["role_player"];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private memberService: MemberService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.memberService.get(id).subscribe((m: any) => {
          if (m) {
            this.member = m;
            this.isNew = false;
          } else {
            console.log(`Member with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      } else {
        this.isNew = true;
      }
    });
  }

  gotoList() {
    this.router.navigate(['/member-list']);
  }

  save() {
    this.memberService.save(this.member).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

}

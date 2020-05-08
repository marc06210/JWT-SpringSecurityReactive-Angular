import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../shared/member/member';
import { MemberService } from '../shared/member/member.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  member: Member = new Member();
  sub: Subscription;
  isNew: boolean = true;
  rolesList: string[] = ["role_cto", "role_coach", "role_player_male", "role_player_female", "role_otm", "role_referee"];
 // roles = ["role_player"];
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
        this.member.roles= [];
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

  getIcoName(roleName: string) {
    return roleName.substring(5) + "_true";
  }

  hasRole(roleName: string) {
    if(this.member.roles) {
      return this.member.roles.includes(roleName);
    } else {
      return false;
    }
  }

  changeValue(role: MatCheckboxChange) {
    console.log('changeStatus: ' +  role.checked + '/' + role.source.name);
    console.log(this.member.roles.length);
    if(this.hasRole(role.source.name)) {
      console.log('role to remove');
      var index = this.member.roles.indexOf(role.source.name);
      if (index !== -1) this.member.roles.splice(index, 1);
    } else {
      console.log('role to add');
      this.member.roles.push(role.source.name);
    }

    console.log(this.member.roles.length);
  }

}

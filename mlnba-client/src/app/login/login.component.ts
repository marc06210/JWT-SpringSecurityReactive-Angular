import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MemberService } from '../shared/member/member.service';
import { Member } from '../shared/member/member';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  credentials = {username: '', password: ''};
  error=null;

  constructor(private app: AppService, private memberService: MemberService,private http: HttpClient, private router: Router) {
  }

  login(){
    this.http.post('/api/login', this.credentials).subscribe(response => {
      var res : any = response;
      if (res.token) {
          this.error = null;
          this.app.token = res.token;
          this.router.navigateByUrl('/');
          this.memberService.me().subscribe(
            (response : Member) => {
              this.app.user = response;
              this.app.isAdmin();
            },
            error => { console.log(error); }
          );
      } else {
          this.app.user = null;
          this.app.token = null;
          this.error = 'Error login in';
      }
    });

    return false;
  }
}

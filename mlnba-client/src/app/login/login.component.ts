import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  credentials = {username: '', password: ''};
  error=null;

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
  }

  login(){
    this.http.post('/api/login', this.credentials).subscribe(response => {
      var res : any = response;
      if (res.token) {
          this.error = null;
          this.app.authenticated = true;
          this.app.token = res.token;
          this.router.navigateByUrl('/');
      } else {
          this.app.authenticated = false;
          this.app.token = null;
          this.error = 'Error login in';
      }
    });

    return false;
  }
}

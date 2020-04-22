import { Component } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mlnba-client';

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
  }

  logout() {
    //this.http.post('logout', {}).subscribe(() => {
        this.app.authenticated = false;
        this.app.token = null;
        this.router.navigateByUrl('/');
    //});
  }

  authenticated() {
    return this.app.authenticated;
  }
}

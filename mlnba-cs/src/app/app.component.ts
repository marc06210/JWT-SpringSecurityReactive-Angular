import { Component, ViewEncapsulation } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'test';

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
  }

  isConnected() : boolean {
    console.log('connected ' + this.app.authenticated);
    return this.app.authenticated;
  }
  
  logout() {
    console.log('logout');
    this.app.credentials = null;
    this.http.post('/logout', {}).subscribe();
    /*
    this.http.post('/api/logout', {}).subscribe(() => {
      console.log('response');
        this.app.authenticated = false;
        this.app.admin = false;
        this.router.navigateByUrl('/');
    });*/
  }

}

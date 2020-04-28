import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MLNBA';

  constructor(private app: AppService, private router: Router) {
  }

  logout() {
        this.app.user = null;
        this.app.token = null;
        this.router.navigateByUrl('/');
  }

  authenticated() {
    return (this.app.user!=null);
  }

  username(): string {
    return this.app.user.username;
  }
}

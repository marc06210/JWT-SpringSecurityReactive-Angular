import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './models/user.model';

@Injectable()
export class AppService {

  authenticated = false;
  admin: boolean = false;
  credentials = null;

  constructor(private http: HttpClient) {
  }

  authenticate(credentials, callback) {
      this.credentials = credentials;
      
      this.http.get('/api/me').subscribe(
        (user:User) => {
            this.authenticated = true;
            this.isAdministrator(user);
            return callback & callback(user);
        },
        (error: Error) => {
            this.authenticated = false;
            this.credentials = null;
            this.admin = false;
        } );
  
  }


  isAdministrator(user :User): void {
      console.log('isadmin');
    this.admin = false

    if(user==null) {
        console.log('user is null')
        return ;
    }

    user.roles.forEach(role => {
        console.log('treating: ' + role.authority);
        if(role.authority=='joueur')
            this.admin = true;
    });

  }
  
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {

  authenticated = false;
  token = null;

  constructor(private http: HttpClient) {
  }

  authenticate(credentials, callback) {
        //const headers = new HttpHeaders(credentials ? {
        //    authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
        //} : {});
        if(credentials) {
            var params = {
                username: credentials.username,
                password: credentials.password
            }

            this.http.post('/conn/process_login', params).subscribe(response => {
                if (response['token']) {
                    this.authenticated = true;
                    this.token = response['token'];
                } else {
                    this.authenticated = false;
                    this.token = null;
                }
                return callback && callback();
            });
        } else {
            this.authenticated = false;
        }
        console.log('token: ' + this.token);

    }

}
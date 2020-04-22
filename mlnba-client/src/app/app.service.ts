import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {

  authenticated = false;
  token = null;

  constructor(private http: HttpClient) {
  }

  authenticate(credentials, callback) {
        if(credentials) { 
            var params = {
                username: credentials.username,
                password: credentials.password
            }

            this.http.post('/conn/process_login', params).subscribe(response => {
                var res : any = response;

                console.log(res.token);
                if (res.token) {
                    this.authenticated = true;
                    this.token = res.token;
                } else {
                    this.authenticated = false;
                    this.token = null;
                }
                return callback && callback();
            });
        } else {
            this.authenticated = false;
        }
    }

}
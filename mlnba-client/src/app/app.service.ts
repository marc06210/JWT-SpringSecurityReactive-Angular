import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from './shared/member/member';

@Injectable()
export class AppService {

  token = null;
  user : Member;

  constructor(private http: HttpClient) {
  }

  isAdmin() : boolean {
    var result: boolean = this.hasRole("role_admin");
    return result;
  }

  hasRole(role: string) : boolean {
    if(this.user==null) {
      return false;
    }

    if(this.user.roles==null) {
      return false;
    }

    return this.user.roles.filter((auth) => !auth.localeCompare(role)).length>0;
  }

}
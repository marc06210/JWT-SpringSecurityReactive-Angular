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

    if(this.user.authorities==null) {
      return false;
    }

    return this.user.authorities.filter((auth) => !auth.authority.localeCompare(role)).length>0;
  }

}
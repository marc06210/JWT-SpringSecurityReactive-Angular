import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HttpRequest, HttpHandler, HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse, HttpResponse, HttpEvent } from '@angular/common/http';
import { FormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

import { UserComponent, DialogDataExampleDialog } from './user/user.component';
import { UserService } from './user/user.service';
import { TeamService } from './team/team.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent, PasswordDialog } from './login/login.component';
import { AppService } from './app.service';
import { TeamComponent, TeamDialog } from './team/team.component';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  constructor(private app: AppService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    req = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });/*
    if(this.app.credentials!=null) {
      var username = this.app.credentials.username;
      var pwd = this.app.credentials.password;
      req = req.clone({headers: req.headers.set('Authorization', 'Basic ' + btoa(username +':' + pwd))});
    }*/

    if(this.app.credentials!=null) {
      var username = this.app.credentials.username;
      var pwd = this.app.credentials.password;
      req = req.clone({headers: req.headers.set('Authorization', 'Basic ' + btoa(username +':' + pwd))});
    }
    
    return next.handle(req)
    /*.pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log(`Request for ${req.urlWithParams} `);
        }
      }), catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        // 401 handled in auth.interceptor
        console.log(error.message);  
         
      }
      return throwError("Myerror");
    }))*/
    
    /*.subscribe((event) => {
      console.log("AuthInterceptor error"+ JSON.stringify(event))
      if (event instanceof HttpResponse) {
          let response = event;
          console.log("AuthInterceptor Authenticate challenge"+ event.headers.has("WWW-Authenticate"));

      }else{
          console.log("AuthInterceptor No Authenticate challenge");
      }
  }, (err: any) => {
      console.log("AuthInterceptor error"+ JSON.stringify(err))
      if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
              // redirect to the login route
              // or show a modal
              console.log("YESSSSSS");
              //return Observable.throw(err.message);
          }
      }
  })*/
  
  ;
    
  }
}


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    DialogDataExampleDialog,
    PasswordDialog,
    TeamDialog,
    HomeComponent,
    LoginComponent,
    TeamComponent
  ],
  entryComponents: [DialogDataExampleDialog, TeamDialog, PasswordDialog],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    FormsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatSnackBarModule,

    SharedModule
  ],
  providers: [AppService, UserService, TeamService, FormBuilder, { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }


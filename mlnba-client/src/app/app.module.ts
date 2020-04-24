import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { TeamListComponent } from './team-list/team-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemberListComponent } from './member-list/member-list.component';
import { LoginComponent } from './login/login.component';
import { AppService } from './app.service';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  constructor(private app: AppService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if(this.app.token!=null) {
      const xhr = req.clone({
        headers: new HttpHeaders({ 
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization' : 'Bearer '+this.app.token
        })
      });
      return next.handle(xhr);
    } else {

      const xhr = req.clone({
        headers: new HttpHeaders({ 
          'X-Requested-With': 'XMLHttpRequest'
        })
      });
      return next.handle(xhr);
    } 
  }
}

@NgModule({
  declarations: [
    AppComponent,
    TeamListComponent,
    MemberListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  providers: [AppService, { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }



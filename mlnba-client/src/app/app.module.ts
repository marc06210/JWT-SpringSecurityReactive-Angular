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
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSelectModule } from '@angular/material/select'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemberListComponent } from './member-list/member-list.component';
import { LoginComponent } from './login/login.component';
import { AppService } from './app.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { CarouselComponent } from './carousel/carousel.component';
import { HomeComponent } from './home/home.component';
import { MatchListComponent } from './match-list/match-list.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  constructor(private app: AppService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if(this.app.token!=null) {
      const xhr = req.clone({
        headers: new HttpHeaders({ 
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization' : this.app.token
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
    LoginComponent,
    TeamEditComponent,
    CarouselComponent,
    HomeComponent,
    MatchListComponent,
    MemberEditComponent,
   ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatToolbarModule,
    MatSidenavModule,
    ReactiveFormsModule
  ],
  providers: [AppService, { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }



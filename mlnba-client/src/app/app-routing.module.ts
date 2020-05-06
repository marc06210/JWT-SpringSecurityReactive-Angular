import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamListComponent } from './team-list/team-list.component';
import { MemberListComponent } from './member-list/member-list.component';
import { LoginComponent } from './login/login.component';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { HomeComponent } from './home/home.component';
import { MatchListComponent } from './match-list/match-list.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { NewsComponent } from './admin/news/news.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'team-list',
    component: TeamListComponent
  },
  {
    path: 'match-list',
    component: MatchListComponent
  },
  {
    path: 'team-add',
    component: TeamEditComponent
  },
  {
    path: 'team-edit/:id',
    component: TeamEditComponent
  },
  {
    path: 'member-list',
    component: MemberListComponent
  },
  {
    path: 'member-add',
    component: MemberEditComponent
  },
  {
    path: 'member-edit/:id',
    component: MemberEditComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'news',
    component: NewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

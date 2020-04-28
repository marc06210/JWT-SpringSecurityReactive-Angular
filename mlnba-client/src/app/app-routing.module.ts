import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamListComponent } from './team-list/team-list.component';
import { MemberListComponent } from './member-list/member-list.component';
import { LoginComponent } from './login/login.component';
import { TeamEditComponent } from './team-edit/team-edit.component';


const routes: Routes = [
  { path: '', redirectTo: '/team-list', pathMatch: 'full' },
  {
    path: 'team-list',
    component: TeamListComponent
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
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

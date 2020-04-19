import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamListComponent } from './team-list/team-list.component';
import { MemberListComponent } from './member-list/member-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/team-list', pathMatch: 'full' },
  {
    path: 'team-list',
    component: TeamListComponent
  },
  {
    path: 'member-list',
    component: MemberListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

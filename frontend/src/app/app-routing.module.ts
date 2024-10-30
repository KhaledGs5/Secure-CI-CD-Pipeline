import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsListComponent } from './components/teams-list/teams-list.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { AddTeamComponent } from './components/add-team/add-team.component';


const routes: Routes = [
  { path: '', redirectTo: 'teams', pathMatch: 'full' },
  { path: 'teams', component: TeamsListComponent },
  { path: 'teams/:id', component: TeamDetailsComponent },
  { path: 'add', component: AddTeamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

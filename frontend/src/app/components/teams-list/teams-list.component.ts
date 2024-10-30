import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/team.model';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
   
})
export class TeamsListComponent implements OnInit {

  teams?: Team[];
  currentTeam: Team = {};
  currentIndex = -1;
  name = '';

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.retrieveTeams();
  }

  retrieveTeams(): void {
    this.teamService.getAll()
      .subscribe({
        next: (data) => {
          this.teams = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveTeams();
    this.currentTeam = {};
    this.currentIndex = -1;
  }

  setActiveTeam(team: Team, index: number): void {
    this.currentTeam = team;
    this.currentIndex = index;
  }

  removeAllTeams(): void {
    this.teamService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchName(): void {
    this.currentTeam = {};
    this.currentIndex = -1;

    this.teamService.findByName(this.name)
      .subscribe({
        next: (data) => {
          this.teams = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
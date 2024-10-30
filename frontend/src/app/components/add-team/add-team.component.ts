import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/team.model';
import { TeamService } from '../../services/team.service';


@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  team: Team = {
    name: '',
    age : 0,
    playersNumber: 0
  };
  submitted = false;

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
  }

  saveTeam(): void {
    const data = {
      name: this.team.name,
      age: this.team.age,
      playersNumber: this.team.playersNumber
    };

    this.teamService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newTeam(): void {
    this.submitted = false;
    this.team = {
      name: '',
      age : 0,
      playersNumber: 0
    };
  }

}
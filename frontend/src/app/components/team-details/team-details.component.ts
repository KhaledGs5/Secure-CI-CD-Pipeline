import { Component, Input, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentTeam: Team = {
    name: '',
    age: 0,
    playersNumber: 0
  };
  
  message = '';

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTeam(this.route.snapshot.params["id"]);
    }
  }

  getTeam(id: string): void {
    this.teamService.get(id)
      .subscribe({
        next: (data) => {
          this.currentTeam = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateTeam(): void {
    this.message = '';

    this.teamService.update(this.currentTeam.id, this.currentTeam)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This team was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteTeam(): void {
    this.teamService.delete(this.currentTeam.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/teams']);
        },
        error: (e) => console.error(e)
      });
  }

}
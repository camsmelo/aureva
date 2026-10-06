import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  standalone: true,
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent {

  activeMember: number | null = null;

  setActiveMember(index: number): void {
    this.activeMember = index;
  }

  clearActiveMember(): void {
    this.activeMember = null;
  }

}
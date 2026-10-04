import { Component, output } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  readonly bookingRequested = output<void>();
}

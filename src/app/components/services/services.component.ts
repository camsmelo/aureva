import { Component, ElementRef, output, viewChild } from '@angular/core';
import { SERVICES, Service } from '../site-data/site-data';

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  readonly bookingRequested = output<string>();
  readonly services: readonly Service[] = SERVICES;
  readonly servicesTrack = viewChild<ElementRef<HTMLElement>>('servicesTrack');

  scrollServices(direction: number): void {
    const track = this.servicesTrack()?.nativeElement;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('.service-card');
    const amount = card ? card.offsetWidth + 14 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * amount, behavior: 'smooth' });
  }
}

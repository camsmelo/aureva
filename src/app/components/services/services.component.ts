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

  readonly servicesTrack =
    viewChild<ElementRef<HTMLElement>>('servicesTrack');

  scrollServices(direction: number): void {
    const track = this.servicesTrack()?.nativeElement;
    if (!track) return;

    const card = track.querySelector<HTMLElement>('.service-card');
    if (!card) return;

    const gap = 14;
    const amount = card.offsetWidth + gap;

    const start = track.scrollLeft;
    const target = start + direction * amount;

    const duration = 800;

    let startTime: number | null = null;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animateScroll = (currentTime: number): void => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = easeInOutCubic(progress);

      track.scrollLeft =
        start + (target - start) * easedProgress;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }
}
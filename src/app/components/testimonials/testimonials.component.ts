import { Component } from '@angular/core';
import { TESTIMONIALS } from '../site-data/site-data';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  templateUrl: './testimonials.component.html'
})
export class TestimonialsComponent {
  readonly testimonials = TESTIMONIALS;
  testimonialIndex = 0;

  previous(): void {
    this.testimonialIndex = (this.testimonialIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }
  next(): void {
    this.testimonialIndex = (this.testimonialIndex + 1) % this.testimonials.length;
  }
  select(index: number): void { this.testimonialIndex = index; }
}

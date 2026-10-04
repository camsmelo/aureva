import { Component, output } from '@angular/core';

@Component({
  selector: 'app-booking-cta',
  standalone: true,
  templateUrl: './booking-cta.component.html'
})
export class BookingCtaComponent {
  readonly bookingRequested = output<void>();
}

//ajuste
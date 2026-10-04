import { Component, inject } from '@angular/core';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { BookingCtaComponent } from './components/booking-cta/booking-cta.component';
import { BookingModalComponent } from './components/booking-modal/booking-modal.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';
import { FloatingSocialsComponent } from './components/floating-socials/floating-socials.component';
import { ContactComponent } from './components/contact/contact.component';
import { AnalyticsService } from './services/analytics.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SiteHeaderComponent,
    HeroComponent,
    ServicesComponent,
    WhyUsComponent,
    TestimonialsComponent,
    BookingCtaComponent,
    BookingModalComponent,
    SiteFooterComponent,
    FloatingSocialsComponent,
    ContactComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  private readonly analytics = inject(AnalyticsService);

  constructor() {
    this.analytics.initialize();
  }
  isBookingOpen = false;
  selectedService = '';

  openBooking(service = ''): void {
    this.analytics.trackBookingOpen();
    if (service) this.analytics.trackServiceSelect(service);
    this.selectedService = service;
    this.isBookingOpen = true;
  }

  closeBooking(): void {
    this.isBookingOpen = false;
    this.selectedService = '';
  }
}

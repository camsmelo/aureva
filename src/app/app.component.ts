import { Component } from '@angular/core';

import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { BookingCtaComponent } from './components/booking-cta/booking-cta.component';
import { BookingModalComponent } from './components/booking-modal/booking-modal.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';
import { ContactComponent } from './components/contact/contact.component';
import { FloatingSocialsComponent } from './components/floating-socials/floating-socials.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

import { AnalyticsService } from './services/analytics.service';
import { ApplicationErrorService } from './core/application-error.service';

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
    ContactComponent,
    FloatingSocialsComponent,
    ErrorPageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  isBookingOpen = false;

  selectedService = '';

  constructor(
    private readonly analytics: AnalyticsService,
    readonly applicationError: ApplicationErrorService
  ) {
    this.analytics.initialize();

    const params = new URLSearchParams(window.location.search);

    // Simulação de erro:
    // http://localhost:4200/?simular-erro=1
    if (params.get('simular-erro') === '1') {
      queueMicrotask(() => {
        this.applicationError.show(
          new Error('Erro simulado para validação da tela de erro.')
        );
      });
    }
  }

  openBooking(service?: string): void {
    this.selectedService = service ?? '';
    this.isBookingOpen = true;

    this.analytics.trackEvent('booking_open', {
      service: this.selectedService || 'general'
    });
  }

  closeBooking(): void {
    this.isBookingOpen = false;
  }

  retryConnection(): void {
    const url = new URL(window.location.href);

    url.searchParams.delete('simular-erro');

    window.location.href = url.toString();
  }
}
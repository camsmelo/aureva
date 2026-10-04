import { Component, inject } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';
@Component({
  selector: 'app-floating-socials',
  standalone: true,
  templateUrl: './floating-socials.component.html'
})
export class FloatingSocialsComponent {
  private readonly analytics = inject(AnalyticsService);

  trackInstagram(): void {
    this.analytics.trackEvent('instagram_click', { link_location: 'floating_button' });
  }

  trackWhatsApp(): void {
    this.analytics.trackEvent('whatsapp_click', { link_location: 'floating_button' });
  }
}

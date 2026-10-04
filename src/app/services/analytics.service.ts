import { Injectable } from '@angular/core';

/** Configure o Measurement ID no campo MEASUREMENT_ID antes de publicar. */
const MEASUREMENT_ID = 'G-XXXXXXXXXX';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private initialized = false;

  initialize(): void {
    if (this.initialized || !/^G-[A-Z0-9]+$/.test(MEASUREMENT_ID) || MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      return;
    }

    this.initialized = true;
    const win = window as Window & {
      dataLayer?: unknown[][];
      gtag?: (...args: unknown[]) => void;
    };
    win.dataLayer = win.dataLayer || [];
    win.gtag = win.gtag || function (...args: unknown[]) {
      win.dataLayer!.push(args);
    };

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);

    win.gtag('js', new Date());
    win.gtag('config', MEASUREMENT_ID, { send_page_view: true });
  }

  trackEvent(eventName: string, parameters: Record<string, string | number | boolean> = {}): void {
    if (!this.initialized) return;
    const win = window as Window & { gtag?: (...args: unknown[]) => void };
    win.gtag?.('event', eventName, parameters);
  }

  trackWhatsAppClick(): void {
    this.trackEvent('whatsapp_click', { link_location: 'floating_button' });
  }

  trackInstagramClick(): void {
    this.trackEvent('instagram_click', { link_location: 'floating_button' });
  }

  trackBookingOpen(): void {
    this.trackEvent('booking_open', { link_location: 'booking_cta' });
  }

  trackServiceSelect(serviceName: string): void {
    this.trackEvent('service_select', { service_name: serviceName });
  }

  trackContactClick(): void {
    // Não envia nome ou telefone ao GA4, evitando o envio de dados pessoais.
    this.trackEvent('contact_whatsapp_click', { link_location: 'contact_section' });
  }

  trackBookingSubmit(): void {
    // Disparado apenas após confirmação de sucesso do servidor.
    this.trackEvent('booking_submit', { form_name: 'booking_form' });
  }
}

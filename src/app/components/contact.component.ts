import { Component, inject } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';

interface ContactPerson {
  name: string;
  phone: string;
  whatsapp: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  private readonly analytics = inject(AnalyticsService);

  readonly contacts: readonly ContactPerson[] = [
    {
      name: 'Jhonnatan Lourenço',
      phone: '+55 11 97987-5411',
      whatsapp: 'https://wa.me/5511979875411'
    },
    {
      name: 'Carolina Capucho',
      phone: '+55 11 94458-1171',
      whatsapp: 'https://wa.me/5511944581171'
    },
    {
      name: 'Jennifer Lourenço',
      phone: '+55 11 95170-3890',
      whatsapp: 'https://wa.me/5511951703890'
    }
  ];

  trackContactClick(): void {
    this.analytics.trackContactClick();
  }
}

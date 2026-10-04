import { Component, effect, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SERVICES } from '../site-data/site-data';
import { AnalyticsService } from '../../services/analytics.service';

interface BookingData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

@Component({
  selector: 'app-booking-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-modal.component.html'
})
export class BookingModalComponent {
  readonly selectedService = input('');
  readonly closed = output<void>();

  readonly services = SERVICES;
  private readonly clinicWhatsApp = '5511942951399';
  private readonly http = inject(HttpClient);
  private readonly analytics = inject(AnalyticsService);

  isSubmitting = false;
  submitSuccess = false;
  submitError = '';
  booking: BookingData = this.emptyBooking();

  constructor() {
    effect(() => {
      const service = this.selectedService();
      if (service && !this.booking.service) {
        this.booking.service = service;
      }
    });
  }

  close(): void {
    if (!this.isSubmitting) this.closed.emit();
  }

  submit(): void {
    this.submitSuccess = false;
    this.submitError = '';

    if (!this.booking.name || !this.booking.phone || !this.booking.email || !this.booking.service) {
      this.submitError = 'Preencha nome, WhatsApp, e-mail e serviço de interesse.';
      return;
    }

    this.isSubmitting = true;

    // Abre o WhatsApp imediatamente após o clique, evitando bloqueio de pop-up
    // e enviando todos os dados preenchidos para o contato principal da Aurêva.
    this.openWhatsAppWithBooking();

    // Mantém o envio por e-mail como cópia/registro da solicitação.
    this.http.post('/api/agendamento', this.booking).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.analytics.trackBookingSubmit();
        this.booking = this.emptyBooking();
      },
      error: () => {
        // O WhatsApp já foi aberto; o usuário ainda pode concluir o contato por lá.
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.analytics.trackBookingSubmit();
        this.booking = this.emptyBooking();
      }
    });
  }

  private openWhatsAppWithBooking(): void {
    const message = [
      'Olá, Aurêva! Gostaria de agendar uma avaliação.',
      '',
      `Nome: ${this.booking.name}`,
      `WhatsApp: ${this.booking.phone}`,
      `E-mail: ${this.booking.email}`,
      `Serviço de interesse: ${this.booking.service}`,
      `Mensagem: ${this.booking.message || 'Não informada'}`
    ].join('\n');

    const whatsappUrl = `https://wa.me/${this.clinicWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }

  private emptyBooking(): BookingData {
    return { name: '', phone: '', email: '', service: this.selectedService(), message: '' };
  }
}

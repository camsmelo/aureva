import { Component, output } from '@angular/core';

@Component({
  selector: 'app-error-page',
  standalone: true,
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent {

  readonly currentYear = new Date().getFullYear();

  readonly retryRequested = output<void>();

  retry(): void {
    this.retryRequested.emit();
  }

  openWhatsApp(): void {
    const phone = '5511942951399';

    const message = encodeURIComponent(
      'Olá! Tentei acessar o site da Aurêva, mas ele está temporariamente indisponível. Gostaria de obter informações sobre os atendimentos.'
    );

    window.open(
      `https://wa.me/${phone}?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    );
  }
}
import { ErrorHandler, Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  private readonly router = inject(Router);

  handleError(error: unknown): void {

    console.error(
      '[Aurêva] Erro inesperado na aplicação:',
      error
    );

    /*
     * Evita tentar navegar novamente caso
     * o próprio componente de erro tenha falhado.
     */
    if (!window.location.pathname.includes('/erro')) {
      this.router.navigate(['/erro']);
    }
  }
}
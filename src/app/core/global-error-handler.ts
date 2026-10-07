import { ErrorHandler, Injectable, inject } from '@angular/core';
import { ApplicationErrorService } from './application-error.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  private readonly applicationError = inject(ApplicationErrorService);

  handleError(error: unknown): void {
    console.error('[Aurêva] Erro inesperado na aplicação:', error);

    // O AppComponent observa este estado e renderiza somente a tela de erro.
    this.applicationError.show(error);
  }
}

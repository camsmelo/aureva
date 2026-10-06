import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationErrorService {

  /**
   * Indica se a aplicação está em estado de erro.
   */
  readonly hasError = signal(false);

  /**
   * Armazena o erro ocorrido.
   */
  readonly error = signal<unknown>(null);

  /**
   * Exibe a tela de erro.
   */
  show(error: unknown): void {
    console.error(
      '[Aurêva] Erro inesperado na aplicação:',
      error
    );

    this.error.set(error);
    this.hasError.set(true);
  }

  /**
   * Limpa o estado de erro.
   */
  clear(): void {
    this.error.set(null);
    this.hasError.set(false);
  }
}
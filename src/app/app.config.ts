import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import { GlobalErrorHandler } from './core/global-error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ]
};

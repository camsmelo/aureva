import { ApplicationConfig, ErrorHandler } from '@angular/core';

import { GlobalErrorHandler } from './core/global-error-handler';

export const appConfig: ApplicationConfig = {

  providers: [

    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }

  ]

};
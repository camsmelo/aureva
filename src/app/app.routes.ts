import { Routes } from '@angular/router';

import { ErrorPageComponent } from './components/error-page/error-page.component';

export const routes: Routes = [

   {
    path: '',
    loadComponent: () =>
      import('./app.component').then(
        m => m.AppComponent
      )
  },

  {
    path: 'erro',
    component: ErrorPageComponent
  },

  {
    path: '**',
    redirectTo: 'erro'
  }
]
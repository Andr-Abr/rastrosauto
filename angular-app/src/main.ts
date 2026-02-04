// IMPORTANTE: zone.js DEBE ser lo primero
import 'zone.js';

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, appConfig)
  .then(() => console.log('✅ Angular iniciado correctamente'))
  .catch((err) => console.error('❌ Error iniciando Angular:', err));
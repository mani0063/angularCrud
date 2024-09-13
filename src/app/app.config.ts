import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { AppModule } from './app.module';
import { provideClientHydration } from '@angular/platform-browser';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideClientHydration(),AppModule]
};

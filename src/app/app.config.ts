import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
// import { AuthAndLoggingInterceptor } from './shared/auth-and-logging.interceptor.ts';

// const authAndLoggingInterceptorFn = (req: any, next: any) => {
//   return new AuthAndLoggingInterceptor().intercept(req, next);
// };

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      // withInterceptors([authAndLoggingInterceptorFn])
    ),
  ]
};

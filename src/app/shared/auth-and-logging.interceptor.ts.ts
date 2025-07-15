import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthAndLoggingInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // --- REQUEST MODIFICATION ---
    const authToken = 'YOUR_SUPER_SECRET_AUTH_TOKEN'; // In a real app, get this from a service

    // Clone the request to add the new header.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });

    console.log('Interceptor: Modified request with Authorization header.');

    // Pass the cloned request instead of the original request to the next handler.
    return next.handle(authReq).pipe(
      // --- RESPONSE MODIFICATION ---
      tap(event => {
        // We only want to log HttpResponses, not other events.
        if (event instanceof HttpResponse) {
          console.log(`Interceptor: Received response with status ${event.status}`);

          // You can also inspect headers from the response
          const correlationId = event.headers.get('X-Correlation-ID');
          if (correlationId) {
            console.log(`Correlation ID: ${correlationId}`);
          }
        }
      })
    );
  }
}

import { inject } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

export const httpErrorInterceptor: (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => Observable<HttpEvent<unknown>> = (req, next) => {
  const snackBar = inject(MatSnackBar);

  function getErrorMessage(error: HttpErrorResponse): string {
    const messages: Record<number, string> = {
      400: 'Bad request (400)',
      401: 'Unauthorized (401)',
      403: 'Forbidden (403)',
      404: 'Not found (404)',
      500: 'Internal server error (500)',
    };
    return messages[error.status] || error.error?.message || error.statusText || 'Unknown error';
  }

  return next(req).pipe(
    catchError((error: unknown) => {
      let message = 'Unknown error';
      if (error instanceof HttpErrorResponse) {
        message = getErrorMessage(error);
      }
      snackBar.open(`Error: ${message}`, undefined, {
        duration: 4000,
        panelClass: ['error-toast'],
      });
      return throwError(() => error);
    }),
  );
};

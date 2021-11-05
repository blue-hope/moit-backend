import {
  ExecutionContext,
  Injectable,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Scope } from '@sentry/hub';
import * as Sentry from '@sentry/minimal';
import { Handlers } from '@sentry/node';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  captureHttpException(scope: Scope, http: HttpArgumentsHost, exception: any) {
    const data = Handlers.parseRequest(<any>{}, http.getRequest(), {});
    scope.setExtra('req', data.request);

    if (data.extra) scope.setExtras(data.extra);
    if (data.user) scope.setUser(data.user);

    Sentry.captureException(exception);
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const host = context.switchToHttp();

    return next.handle().pipe(
      catchError((error) => {
        console.log(error);
        Sentry.withScope((scope) => {
          this.captureHttpException(scope, host, error);
        });
        throw error;
      }),
    );
  }
}

import { bootstrapApplication } from '@angular/platform-browser';
import {provideRouter, withComponentInputBinding, withInMemoryScrolling} from '@angular/router';
import {
    HTTP_INTERCEPTORS,
    provideHttpClient,
    withFetch,
    withInterceptors,
    withInterceptorsFromDi
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {routes} from "./app/app.routes";
import {AuthInterceptor} from "./app/services/auth/auth-interceptor.service";

// Factory function for translation loader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top', // Always scroll to top unless manually controlled
        anchorScrolling: 'enabled', // ⛔ Disable default fragment scrolling
      }),
      withComponentInputBinding()
    ),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
      {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor, // DI-based interceptor
          multi: true
      },
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    TranslateService,
  ],
}).catch(err => console.error(err));


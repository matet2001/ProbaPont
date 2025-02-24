import { bootstrapApplication } from '@angular/platform-browser';
import {provideRouter, withComponentInputBinding, withInMemoryScrolling} from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { ViewportScroller } from '@angular/common';
import { Router, Scroll } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppComponent } from './app/app.component';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {routes} from "./app/app.routes";

// Factory function for translation loader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top', // Always scroll to top unless manually controlled
        anchorScrolling: 'enabled', // ⛔ Disable default fragment scrolling
      }),
      withComponentInputBinding()
    ),
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


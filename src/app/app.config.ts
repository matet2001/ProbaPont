import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from "@angular/common/http";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideStorage, getStorage } from "@angular/fire/storage";
import { provideAnalytics, getAnalytics } from "@angular/fire/analytics";
import { provideTranslateService } from "@ngx-translate/core";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { importProvidersFrom } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../enviroments/enviroment";
import { provideNativeDateAdapter } from "@angular/material/core";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";

// ✅ Custom loader function (same as in your old main.ts)
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
        routes,
        withInMemoryScrolling({
          scrollPositionRestoration: 'top',
          anchorScrolling: 'enabled',
        }),
        withComponentInputBinding()
    ),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideTranslateService(),

    // ✅ Correct translation setup
    importProvidersFrom(
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        })
    ),

    // ✅ Firebase setup
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAnalytics(() => getAnalytics()),
    provideNativeDateAdapter()
  ]
};

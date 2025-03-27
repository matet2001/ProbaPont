import { bootstrapApplication } from '@angular/platform-browser';
import {provideRouter, withComponentInputBinding, withInMemoryScrolling} from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import {HttpClient, provideHttpClient, withFetch, withInterceptorsFromDi} from '@angular/common/http';
import { AppComponent } from './app/app.component';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {routes} from "./app/app.routes";

// Firebase Imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import {provideFirestore, getFirestore, addDoc, collection} from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';
import {environment} from "./enviroments/enviroment";

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
    TranslateService,
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()),
  provideStorage(() => getStorage()),
  provideAnalytics(() => getAnalytics()),
  provideHttpClient(withInterceptorsFromDi(), withFetch())
  ],
}).catch(err => console.error(err));
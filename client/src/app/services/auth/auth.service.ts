import {Injectable, inject, Renderer2, Inject, Input, HostListener} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {LocalStorageService} from "../locale-storage/local-storage.service";
import {DOCUMENT} from "@angular/common";

interface AuthResponse {
  data: string; // Token received from the backend
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = '/api/auth'; // Update with your backend URL
  private authState = new BehaviorSubject<boolean>(this.hasToken());
  private document: Document;

  constructor(private localStorageService: LocalStorageService, @Inject(DOCUMENT) private injectedDocument: Document) {
    this.document = injectedDocument;

    this.closeModal();
  }

  closeModal() {
    const modal = this.document.getElementById("authModal") as HTMLDialogElement;
    modal?.close();
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res) => {
        this.localStorageService.set('token', res.data);
        this.authState.next(true);
      })
    );
  }

  register(username: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, { username, email, password }).pipe(
      tap((res) => {
        // this.localStorageService.set('token', res.data);
        // this.authState.next(true);
      })
    );
  }

  logout() {
    this.localStorageService.remove('token');
    this.authState.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.authState.asObservable();
  }

  private hasToken(): boolean {
    return !!this.localStorageService.get('token');
  }
}

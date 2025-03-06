import {Injectable, inject, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {LocalStorageService} from "../locale-storage/local-storage.service";
import {DOCUMENT} from "@angular/common";

interface AuthResponse {
  data: string; // Token received from the backend
}

interface UserData {
  username: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = '/api/auth'; // Update with your backend URL
  private authState = new BehaviorSubject<boolean>(this.hasToken());
  private document: Document;

  private modal: HTMLDialogElement | null = null;
  public userData: UserData;

  constructor(private localStorageService: LocalStorageService, @Inject(DOCUMENT) private injectedDocument: Document) {
    this.document = injectedDocument;

    this.closeModal();
  }

  initModal() {
    this.modal = this.document.getElementById("authModal") as HTMLDialogElement;
  }

  openModal() {
    this.modal?.showModal();
  }

  closeModal() {
    this.modal?.close();
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res) => {
        this.localStorageService.set('token', res.data);
        this.authState.next(true);
      })
    );
  }

  getUserData() {
    this.http.get<UserData>(`${this.apiUrl}/my-account`).pipe(
        tap((res) => {
          this.userData = res;
        })
    )
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

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token != null;
  }

  private hasToken(): boolean {
    return !!this.localStorageService.get('token');
  }
}

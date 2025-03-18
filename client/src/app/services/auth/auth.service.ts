import {Injectable, inject, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {LocalStorageService} from "../locale-storage/local-storage.service";
import {DOCUMENT} from "@angular/common";

export interface AuthResponse {
  data: string; // Token received from the backend
}

interface UserDataResponse {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  }
}

interface UserData {
  id: string;
  username: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api'; // Update with your backend URL
  private authState = new BehaviorSubject<boolean>(this.hasToken());
  private document: Document;

  private modal: HTMLDialogElement | null = null;
  public userData: UserData | null = null;

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
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
        tap((res) => {
          this.localStorageService.set('token', res.data);
          this.authState.next(true);

          this.fetchUserData().subscribe();
        })
    );
  }

  fetchUserData(): Observable<UserDataResponse> {
    return this.http.get<UserDataResponse>(`${this.apiUrl}/users/my-account`).pipe(
        tap((res) => {
          this.userData = res.user;
          this.localStorageService.set('userData', res.user);
        })
    );
  }

  getUserData() : UserData | null {
    if (this.userData) {
      return this.userData;
    } else {
      return this.localStorageService.get('userData');
    }
  }

  register(username: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/signup`, { username, email, password }).pipe(
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
    const token = this.localStorageService.get('token');
    return token != null;
  }

  private hasToken(): boolean {
    return !!this.localStorageService.get('token');
  }
}

import {EventEmitter, inject, Injectable, Output} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword, onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User
} from '@angular/fire/auth';
import {AlertService} from "../alert/alert.service";
import {doc, Firestore, getDoc, setDoc} from '@angular/fire/firestore';
import {TranslateService} from "@ngx-translate/core";
import {LocalStorageService} from "../locale-storage/local-storage.service";
import {BehaviorSubject, Observable, timer} from "rxjs";
import {BookingIntent} from "../../models/booking.model";

export interface UserDetails {
  uid: string;
  email: string;
  bandName: string;
  fullName: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  authReady = new EventEmitter<void>();

  localUser: UserDetails | null = null;

  alertService: AlertService = inject(AlertService);
  translate: TranslateService = inject(TranslateService);
  localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor(private auth: Auth, private firestore: Firestore) {
    this.loadUserOnStart();
  }

  private async loadUserOnStart() {
    onAuthStateChanged(this.auth, async (user: User | null) => {
      if (user) {
        const userRef = doc(this.firestore, 'users', user.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          this.localUser = userSnapshot.data() as UserDetails;
          this.localStorageService.set('user', JSON.stringify(this.localUser));
        } else {
          this.localUser = null;
          this.localStorageService.remove('user');
        }
      } else {
        this.localUser = null;
        this.localStorageService.remove('user');
      }

      this.authReady.emit();
    });
  }

  async register(email: string, password: string, fullName: string, bandName: string, phone: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      if (user) {
        await updateProfile(user, { displayName: `${fullName} ${bandName}` });

        const userRef = doc(this.firestore, "users", user.uid);
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          fullName,
          bandName,
          phone,
          createdAt: new Date(),
        });

        this.alertService.success(this.translate.instant("AUTH.ALERT.REGISTRATION_SUCCESS"));
      }
    } catch (error: any) {
      console.error("Error signing up:", error);
      throw new Error(error.code); // Return only error code
    }
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      if (user) {
        const userRef = doc(this.firestore, 'users', user.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          this.localUser = userSnapshot.data() as UserDetails;
          this.alertService.success("AUTH.WELCOME_BACK", "default", (user.displayName || 'User') + "!" );
        } else {
          this.alertService.success("AUTH.WELCOME_BACK", "default", (user.displayName || 'User') + "!" );
        }
      }
    } catch (error: any) {
      console.error('Error logging in:', error);
      throw new Error(error.code); // Return only error code
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.localUser = null;
      console.log('User logged out');
    } catch (error: any) {
      console.error('Error logging out:', error.message);
    }
  }

  public getUser(): UserDetails | null {
    return this.localUser;
  }

  public isAuthenticated()  {
    return this.localUser;
  }
}

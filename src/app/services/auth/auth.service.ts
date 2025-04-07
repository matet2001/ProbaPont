import {inject, Injectable} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword, onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User
} from '@angular/fire/auth';
import {AlertService} from "../alert.service";
import {doc, Firestore, getDoc, setDoc} from '@angular/fire/firestore';
import {TranslateService} from "@ngx-translate/core";
import {LocalStorageService} from "../locale-storage/local-storage.service";

export interface UserDetails {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  localUser: UserDetails | null = null; // Store logged-in user data

  alertService: AlertService = inject(AlertService);
  translate: TranslateService = inject(TranslateService);
  localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor(private auth: Auth, private firestore: Firestore) {
    this.loadUserOnStart();
  }

  private loadUserOnStart() {
    onAuthStateChanged(this.auth, async (user: User | null) => {
      if (user) {
        const userRef = doc(this.firestore, 'users', user.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          this.localUser = userSnapshot.data() as UserDetails;
          this.localStorageService.set('user', JSON.stringify(this.localUser)); // Store user in localStorage
        }
      } else {
        this.localUser = null;
        this.localStorageService.remove('user'); // Clear localStorage on logout
      }
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

  async forgotPassword(email: string) {
    if (!email) {
      this.alertService.error("Please enter your email address first.");
      return;
    }

    try {
      await sendPasswordResetEmail(this.auth, email);
      this.alertService.success("Password reset email sent!");
    } catch (error: any) {
      console.error("Error resetting password:", error.message);
      this.alertService.error(error.message);
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

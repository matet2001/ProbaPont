import {inject, Injectable} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut, updateProfile,
  User
} from '@angular/fire/auth';
import {AlertService} from "../alert.service";
import {Firestore, doc, setDoc, getDoc} from '@angular/fire/firestore';
import {TranslateService} from "@ngx-translate/core";

interface UserDetails {
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

  constructor(private auth: Auth, private firestore: Firestore) {}

  async register(email: string, password: string, firstName: string, lastName: string, phone: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      if (user) {
        await updateProfile(user, { displayName: `${firstName} ${lastName}` });

        const userRef = doc(this.firestore, "users", user.uid);
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          firstName,
          lastName,
          phone,
          createdAt: new Date(),
        });

        this.alertService.success(this.translate.instant("AUTH.REGISTER_SUCCESS"));
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
          const userData = userSnapshot.data() as UserDetails;
          this.localUser = userData;
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

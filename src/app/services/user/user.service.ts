import { Injectable } from "@angular/core";
import { UserDetails } from "../auth/auth.service";
import { doc, Firestore, getDoc } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private userCache = new Map<string, UserDetails>();

  constructor(private firestore: Firestore) {}

  async fetchUser(userId: string): Promise<UserDetails | undefined> {
    if (this.userCache.has(userId)) return this.userCache.get(userId);

    const ref = doc(this.firestore, "users", userId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const user = snap.data() as UserDetails;
      this.userCache.set(userId, user);
      return user;
    }
    return undefined;
  }

  getCachedUser(userId: string): Promise<UserDetails | undefined> {
    return this.fetchUser(userId);
  }
}

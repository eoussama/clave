import { getAuth, type Auth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { FirebaseHelper } from './firebase.helper';



export class AuthHelper {

  private static auth: Auth;

  private static init(): void {
    const app = FirebaseHelper.getApp();
    this.auth = getAuth(app);
  }

  static getAuth(): Auth {
    if (!this.auth) {
      this.init();
    }

    return this.auth;
  }

  static login(): void {
    const auth = this.getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider);
  }

  static logout(): void {
    const auth = this.getAuth();
    signOut(auth);
  }
}
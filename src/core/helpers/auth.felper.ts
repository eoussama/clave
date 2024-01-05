import { getAuth, type Auth } from 'firebase/auth';
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
}
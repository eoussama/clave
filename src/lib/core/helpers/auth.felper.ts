import * as config from '$env/static/public';
import { get } from 'svelte/store';

import { FiremittHelper } from '@eoussama/firemitt';

import {
  type Auth,
  type UserCredential,
  getAuth,
  signOut,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';

import { FirebaseHelper } from './firebase.helper';
import { appStore } from '../stores/app.store';



/**
 * @description
 * Helps with authentication.
 */
export class AuthHelper {

  /**
   * @description
   * The Firebase authentication instance.
   */
  private static auth: Auth;

  /**
   * @description
   * Initializes a base Firebase authentication instance.
   */
  private static init(): void {
    const app = FirebaseHelper.getApp();
    this.auth = getAuth(app);
  }

  /**
   * @description
   * Retuns a Firebase authentication
   */
  static getAuth(): Auth {
    if (!this.auth) {
      this.init();
    }

    return this.auth;
  }

  /**
   * @description
   * Logs user in.
   */
  static login(): Promise<UserCredential> {
    return new Promise((resolve, reject) => {
      FiremittHelper
        .auth({
          url: config.PUBLIC_FIREGUARD_URL,
          config: {
            name: config.PUBLIC_FIREGUARD_NAME,
            logo: config.PUBLIC_FIREGUARD_LOGO,
            firebase: FirebaseHelper.getConfig()
          }
        })
        .then(token => {
          if (!token.length) {
            return reject();
          }

          const credential = GoogleAuthProvider.credential(token);
          resolve(signInWithCredential(this.auth, credential));
        })
        .catch(reject);
    });
  }

  /**
   * @description
   * Logs user out.
   */
  static logout(): void {
    const auth = this.getAuth();
    signOut(auth);
  }

  /**
   * @description
   * Checks if user is logged in.
   */
  static isLoggedIn(): boolean {
    return Boolean(get(appStore).user);
  }
}
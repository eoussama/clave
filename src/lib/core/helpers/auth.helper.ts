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
import { AppCache } from '../enums/app-cache.enum';



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
            theme: {
              text: '#2D3250',
              primary: '#61A3BA',
              secondary: '#FFFFDD'
            },
            firebase: FirebaseHelper.getConfig()
          }
        })
        .then(token => {
          if (!token.length) {
            return reject();
          }

          const credential = GoogleAuthProvider.credential(token);

          localStorage.setItem(AppCache.LoggedIn, credential.signInMethod);
          resolve(signInWithCredential(this.auth, credential));
        })
        .catch(reject);
    });
  }

  /**
   * @description
   * Logs user out.
   */
  static logout(): Promise<void> {
    return new Promise(resolve => {
      const auth = this.getAuth();

      signOut(auth).then(() => {
        localStorage.removeItem(AppCache.LoggedIn);
        resolve();
      });
    });
  }

  /**
   * @description
   * Checks if user is logged in.
   */
  static isLoggedIn(): boolean {
    return Boolean(get(appStore).user);
  }
}
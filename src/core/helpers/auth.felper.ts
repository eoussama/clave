import { getAuth, type Auth, signOut } from 'firebase/auth';
import { FiremittHelper } from '@eoussama/firemitt';

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
    FiremittHelper
      .auth({
        url: 'https://ouss.es/fireguard',
        config: {
          name: 'Clave',
          firebase: FirebaseHelper.getConfig(),
          logo: 'https://github.com/eoussama/clave/blob/main/static/favicon.png?raw=true'
        }
      })
      .then(token => {
        console.log({ token });
      });
  }

  static logout(): void {
    const auth = this.getAuth();
    signOut(auth);
  }
}
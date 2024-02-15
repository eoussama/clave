import * as config from '$env/static/public';
import { initializeApp, type FirebaseApp } from 'firebase/app';



/**
 * @description
 * Helps with Firebase.
 */
export class FirebaseHelper {

  /**
   * @description
   * The Firebase app instance.
   */
  private static app: FirebaseApp;

  /**
   * @description
   * Initializes the Firebase instance.
   */
  private static init(): void {
    const config = this.getConfig();
    this.app = initializeApp(config);
  }

  /**
   * @description
   * Returns the Firebase configuration object.
   */
  static getConfig() {
    return {
      appId: config.PUBLIC_FIREBASE_APP_ID,
      apiKey: config.PUBLIC_FIREBASE_API_KEY,
      projectId: config.PUBLIC_FIREBASE_PROJECT_ID,
      authDomain: config.PUBLIC_FIREBASE_AUTH_DOMAIN,
      measurementId: config.PUBLIC_FIREBASE_MEASUREMENT_ID,
      storageBucket: config.PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: config.PUBLIC_FIREBASE_MESSAGING_SENDER_ID
    }
  }

  /**
   * @description
   * Returns a valid Firebase app instance.
   */
  static getApp(): FirebaseApp {
    if (!this.app) {
      this.init();
    }

    return this.app;
  }
}
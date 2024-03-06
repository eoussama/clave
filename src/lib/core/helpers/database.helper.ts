import { Database, get, getDatabase, ref, set } from 'firebase/database';

import { CacheHelper } from './cache.helper';
import { FirebaseHelper } from './firebase.helper';

import type { TCache } from '../types/cache.type';



/**
 * @description
 * Helps with generic firebase realtime database data read and write
 */
export class DatabaseHelper {

  /**
 * @description
 * The Firebase app instance.
 */
  private static database: Database;

  /**
   * @description
   * Initializes the Firebase instance.
   */
  private static init(): void {
    const app = FirebaseHelper.getApp();
    this.database = getDatabase(app);
  }

  /**
   * @description
   * Returns a valid Firebase app instance.
   */
  static getDatabase(): Database {
    if (!this.database) {
      this.init();
    }

    return this.database;
  }

  /**
   * @description
   * Retrieves an element from the database
   *
   * @param key The key of the targeted value
   * @param cache Whether to use cache when needed
   */
  static get<T = any>(key: keyof TCache['db'], cache: boolean = true): Promise<T> {
    return new Promise(async resolve => {
      if (cache && await CacheHelper.isValid(key)) {

        // Fetching data from cache
        const data = CacheHelper.get(key);

        // Returning fetched data
        return resolve(data as T);
      }

      // Retrieving data from firebase
      const snapRef = ref(this.getDatabase(), key);
      const snapshot = await get(snapRef);
      const data = snapshot.val() as T;

      // Updating the cache
      CacheHelper.update(key, data);

      // Returning fetched data
      resolve(data);
    });
  }

  /**
   * @description
   * Updates an element in the database
   *
   * @param key The key of the targeted value
   * @param value The value to update
   */
  static set(key: keyof TCache['db'], value: any): Promise<void> {
    return new Promise(async resolve => {

      // Preparing the target reference
      const snapRef = ref(this.getDatabase(), key);

      // Updating the valie
      await set(snapRef, value);

      // Reporting back
      resolve();
    });
  }
}

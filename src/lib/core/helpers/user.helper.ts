import type { TUserData } from '../types/user-data.type';
import { DatabaseHelper } from './database.helper';



/**
 * @description
 * Helps with user data.
 */
export class UserHelper {

  /**
   * @description
   * The name of the key that stors the user
   * on the realtime database.
   */
  private static readonly DB_KEY: string = 'users';

  /**
   * @description
   * Updates a specific user.
   *
   * @param userId The ID of the target user.
   * @param value The value to update.
   */
  static set(userId: string, value: TUserData): Promise<void> {
    return DatabaseHelper.set(`${this.DB_KEY}/${userId}` as any, value);
  }

  /**
   * @description
   * Fetches user data.
   *
   * @param userId The ID of the target user
   */
  static get(userId: string): Promise<TUserData> {
    return DatabaseHelper.get(`${this.DB_KEY}/${userId}` as any, false);
  }

  /**
   * @description
   * Creates a user object.
   *
   * @param userId The user ID to create.
   */
  static create(userId: string): Promise<TUserData> {
    return new Promise(async resolve => {
      const user = {
        tags: [],
        clips: [],
        id: userId,
        settings: {}
      };

      await this.set(userId, user);
      resolve(user);
    });
  }
}
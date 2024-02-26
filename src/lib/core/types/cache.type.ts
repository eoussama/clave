import type { TUserData } from './user-data.type';



/**
 * @description
 * Local cache data definition
 */
export type TCache = {

  /**
   * @description
   * The timestamp when the cache was last updated.
   */
  updateTime: number;

  /**
   * @description
   * Cached database model
   */
  db: {

    /**
     * Object of cached users.
     */
    users: {

      /**
       * @description
       * The user's ID
       */
      [key: string]: TUserData
    };
  };
}
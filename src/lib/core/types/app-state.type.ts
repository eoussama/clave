import type { User } from 'firebase/auth';
import type { TNullable } from '@eoussama/firemitt';

import type { TUserData } from './user-data.type';



/**
 * @description
 * Represents the state of the application.
 */
export type TAppState = {

  /**
   * @description
   * The logged in user.
   */
  user: TNullable<User>

  /**
   * @description
   * The logged in user's data.
   */
  data: TNullable<TUserData>

  /**
   * @description
   * If the app is loading.
   */
  loading: boolean
}
import type { User } from 'firebase/auth';
import type { TNullable } from '@eoussama/firemitt';



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
}
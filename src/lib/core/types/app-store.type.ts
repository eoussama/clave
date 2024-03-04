import type { Invalidator, Subscriber, Unsubscriber } from 'svelte/store';
import type { User } from 'firebase/auth';

import type { TClip } from './clip.type';
import type { TAppState } from './app-state.type';
import type { TUserData } from './user-data.type';
import type { TSettings } from './settings.type';



/**
 * @description
 * Represents the structure of the application store.
 */
export type TAppStore = {

  /**
   * @description
   * Method to subscribe to changes in the application state.
   */
  subscribe: (this: void, run: Subscriber<TAppState>, invalidate?: Invalidator<TAppState> | undefined) => Unsubscriber

  /**
   * @description
   * Method to initialize the application store.
   */
  init: () => void

  /**
   * @description
   * Method to start the loader.
   */
  startLoading: () => void

  /**
   * @description
   * Method to finish the loader.
   */
  finishLoading: () => void

  /**
   * @description
   * Logs user off.
   */
  logout: () => void

  /**
   * @description
   * Logs user in.
   *
   * @param user The user that logged in.
   * @param data The user data.
   */
  login: (user: User, data: TUserData) => void

  /**
   * @description
   * Updates the clips.
   *
   * @param clips The clips to update.
   */
  updateClips: (clips: Array<TClip>) => void

  /**
   * @description
   * Updates the settings.
   *
   * @param settings The settings to update.
   */
  updateSettings: (settings: TSettings) => void
}
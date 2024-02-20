import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';

import type { TAppStore } from '../types/app-store.type';
import { initialAppState } from '../consts/app-store.const';



/**
 * @description
 * Represents the application store that manages the application state.
 */
export const appStore: TAppStore = (() => {
  const { subscribe, set, update } = writable(initialAppState);

  return {
    subscribe,

    init: () => set(initialAppState),
    load: () => update(state => ({ ...state, loaded: true })),
    logout: () => update(state => ({ ...state, user: null })),
    login: (user: User) => update(state => ({ ...state, user: { ...user } }))
  }
})();
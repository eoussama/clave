import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';

import { initialAppState } from '../consts/app-store.const';

import type { TClip } from '../types/clip.type';
import type { TSettings } from '../types/settings.type';
import type { TAppStore } from '../types/app-store.type';
import type { TUserData } from '../types/user-data.type';



/**
 * @description
 * Represents the application store that manages the application state.
 */
export const appStore: TAppStore = (() => {
  const { subscribe, set, update } = writable(initialAppState);

  return {
    subscribe,

    init: () => set(initialAppState),

    startLoading: () => update(state => ({ ...state, loading: true })),
    finishLoading: () => update(state => ({ ...state, loading: false })),

    logout: () => update(state => ({ ...state, user: null, data: null })),
    login: (user: User, data: TUserData) => update(state => ({ ...state, user, data })),

    updateClips: (clips: Array<TClip>) => update(state => ({ ...state, data: { ...state.data, clips } as TUserData })),
    updateSettings: (settings: TSettings) => update(state => ({ ...state, data: { ...state.data, settings } as TUserData }))
  }
})();
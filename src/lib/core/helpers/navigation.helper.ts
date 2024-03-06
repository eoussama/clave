import { base } from '$app/paths';
import { goto } from '$app/navigation';

import { AuthHelper } from './auth.helper';
import { appStore } from '../stores/app.store';

import type { Page } from '../enums/page.enum';
import { AppCache } from '../enums/app-cache.enum';



/**
 * @description
 * Helper class for Fireguard related functionalities.
 */
export class NavigationHelper {

  /**
   * @description
   * Redirection timeout in milliseconds.
   */
  private static readonly timeout: number = 50;

  /**
   * @description
   * Navigates to specified page
   *
   * @param page The page to navigate to
   */
  static navigate(page: Page): Promise<void> {
    appStore.startLoading();

    return goto(`${base}/${page}`, { replaceState: true })
      .finally(() => {
        AuthHelper.getAuth().authStateReady().then(() => {
          const loggedIn = Boolean(localStorage.getItem(AppCache.LoggedIn));

          if (AuthHelper.isLoggedIn() === loggedIn) {
            setTimeout(() => {
              appStore.finishLoading();
            }, this.timeout);
          }
        });
      });
  }
}
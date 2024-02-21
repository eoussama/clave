import { base } from '$app/paths';
import { goto } from '$app/navigation';

import type { Page } from '../enums/page.enum';
import { appStore } from '../stores/app.store';



/**
 * @description
 * Helper class for Fireguard related functionalities.
 */
export class NavigationHelper {

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
        setTimeout(() => {
          appStore.finishLoading();
        }, 0);
      });
  }
}
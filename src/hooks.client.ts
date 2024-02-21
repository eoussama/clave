import { onAuthStateChanged } from 'firebase/auth';

import { appStore } from '$lib/core/stores/app.store';
import { AuthHelper } from '$lib/core/helpers/auth.helper';



(() => {
  appStore.init();
  appStore.startLoading();

  const auth = AuthHelper.getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      appStore.login(user);
    } else {
      appStore.logout();
    }
  });
})();
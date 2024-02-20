import { onAuthStateChanged } from 'firebase/auth';

import { appStore } from '$lib/core/stores/app.store';
import { AuthHelper } from '$lib/core/helpers/auth.helper';



(() => {
  appStore.init();
  const auth = AuthHelper.getAuth();

  onAuthStateChanged(auth, (user) => {
    appStore.load();

    if (user) {
      appStore.login(user);
    } else {
      appStore.logout();
    }
  });
})();
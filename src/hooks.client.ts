import { appStore } from '$lib/core/stores/app.store';
import { AuthHelper } from '$lib/core/helpers/auth.helper';



(() => {
  appStore.init();
  appStore.startLoading();

  const auth = AuthHelper.getAuth();
  
  auth.onAuthStateChanged(user => {
    if (user) {
      appStore.login(user);
    } else {
      appStore.logout();
    }
  });
})();
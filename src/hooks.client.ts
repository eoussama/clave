import { appStore } from '$lib/core/stores/app.store';
import { AuthHelper } from '$lib/core/helpers/auth.helper';
import { UserHelper } from '$lib/core/helpers/user.helper';



(() => {
  appStore.init();
  appStore.startLoading();

  const auth = AuthHelper.getAuth();

  auth.onAuthStateChanged(async user => {
    if (user) {
      let data = await UserHelper.get(user.uid) ?? await UserHelper.create(user.uid);

      appStore.login(user, data);
    } else {
      appStore.logout();
    }
  });
})();
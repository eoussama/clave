import { onValue, ref } from 'firebase/database';

import { AuthHelper } from '$lib/core/helpers/auth.helper';
import { UserHelper } from '$lib/core/helpers/user.helper';
import { DatabaseHelper } from '$lib/core/helpers/database.helper';

import { appStore } from '$lib/core/stores/app.store';
import type { TUserData } from '$lib/core/types/user-data.type';



(() => {
  appStore.init();
  appStore.startLoading();

  const auth = AuthHelper.getAuth();

  auth.onAuthStateChanged(async user => {
    if (user) {
      let data = await UserHelper.get(user.uid) ?? await UserHelper.create(user.uid);

      appStore.login(user, data);

      const database = DatabaseHelper.getDatabase();
      const db = ref(database, `users/${user.uid}`);

      onValue(db, snapshot => {
        const updatedData: TUserData = snapshot.val();
        
        appStore.updateClips(updatedData.clips);
        appStore.updateSettings(updatedData.settings);
      });
    } else {
      appStore.logout();
    }
  });
})();
import { v4 as uuid } from 'uuid';
import { get } from 'svelte/store';

import { appStore } from '../stores/app.store';
import type { TClip } from '../types/clip.type';
import { ClipType } from '../enums/clip-type.enum';
import { UserHelper } from './user.helper';
import type { TUserData } from '../types/user-data.type';



/**
 * @description
 * Helps clips.
 */
export class ClipHelper {

  /**
   * @description
   * Creates a new clip.
   *
   * @param clip The clip to create
   */
  static create(clip: Partial<TClip>): Promise<TClip> {
    return new Promise(resolve => {
      const newClip: TClip = {
        id: clip.id ?? uuid(),
        tags: clip.tags ?? [],
        title: clip.title ?? '',
        content: clip.content ?? '',
        type: clip.type ?? ClipType.Text,
        sensitive: clip.sensitive ?? false,
        creationTime: clip?.creationTime ?? Date.now()
      };

      this.add(newClip);
      resolve(newClip);
    })
  }

  static add(clip: TClip): Promise<void> {
    return new Promise((resolve, reject) => {
      const userData = get(appStore).data;

      if (userData) {
        const updatedUserData: TUserData = {
          id: userData.id,
          settings: userData.settings ?? {},
          clips: [...(userData.clips ?? []), { ...clip }]
        };

        UserHelper
          .set(userData?.id, updatedUserData)
          .then(() => resolve())
          .catch(() => reject());
      } else {
        reject();
      }
    });
  }
}
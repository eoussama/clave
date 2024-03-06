import { v4 as uuid } from 'uuid';
import { get } from 'svelte/store';

import { UserHelper } from './user.helper';

import { appStore } from '../stores/app.store';
import { ClipType } from '../enums/clip-type.enum';

import type { TClip } from '../types/clip.type';
import type { TNullable } from '../types/nullable.type';
import type { TUserData } from '../types/user-data.type';



/**
 * @description
 * Helps clips.
 */
export class ClipHelper {

  /**
   * @description
   * Creates a new clip
   *
   * @param clip The clip to create
   */
  static create(clip: Partial<TClip>): Promise<TClip> {
    return new Promise((resolve, reject) => {
      const newClip: TClip = {
        id: clip.id ?? uuid(),
        tags: clip.tags ?? [],
        title: clip.title ?? '',
        content: clip.content ?? '',
        type: clip.type ?? ClipType.Text,
        sensitive: clip.sensitive ?? false,
        creationTime: clip?.creationTime ?? Date.now()
      };

      this.add(newClip).then(() => resolve(newClip)).catch(reject);
    })
  }
  /**
   * @description
   * Updates an existing clip
   *
   * @param clip The clip to update
   */
  static update(clip: TClip): Promise<TClip> {
    return new Promise(async (resolve, reject) => {
      if (await this.exists(clip.id)) {
        this.set(clip).then(() => resolve(clip)).catch(reject);
      } else {
        reject();
      }
    })
  }

  private static get(clipId: string): Promise<TNullable<TClip>> {
    return new Promise((resolve, reject) => {
      const userData = get(appStore).data;

      if (userData) {
        const clip = userData.clips.find(e => e.id === clipId);
        resolve(clip ?? null);
      } else {
        reject();
      }
    });
  }

  private static exists(clipId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.get(clipId).then(clip => resolve(Boolean(clip))).catch(reject);
    });
  }

  private static add(clip: TClip): Promise<void> {
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

  private static set(clip: TClip): Promise<void> {
    return new Promise((resolve, reject) => {
      const userData = get(appStore).data;

      if (userData) {
        const updatedUserData: TUserData = {
          id: userData.id,
          settings: userData.settings ?? {},
          clips: [...(userData.clips ?? [])]
        };

        const clips = [...updatedUserData.clips];
        const clipIndex = updatedUserData.clips.findIndex(e => e.id === clip.id);

        updatedUserData.clips = [...clips.slice(0, clipIndex), clip, ...clips.slice(clipIndex + 1)]

        if (clipIndex !== -1) {
          UserHelper
            .set(userData?.id, updatedUserData)
            .then(() => resolve())
            .catch(() => reject());
        } else {
          reject();
        }
      } else {
        reject();
      }
    });
  }
}
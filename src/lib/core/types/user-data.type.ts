import type { TTag } from './tag.type';
import type { TClip } from './clip.type';
import type { TSettings } from './settings.type';



/**
 * @description
 * Definition of a user
 */
export type TUserData = {

  /**
   * @description
   * The ID of the user
   */
  id: string

  /**
   * @description
   * The user' settings
   */
  settings: TSettings

  /**
   * @description
   * The user's tags
   */
  tags: Array<TTag>

  /**
   * @description
   * The user's clips
   */
  clips: Array<TClip>
}
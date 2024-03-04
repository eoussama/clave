import type { TTag } from './tag.type';
import type { ClipType } from '../enums/clip-type.enum';



/**
 * @description
 * Clipped content definition.
 */
export type TClip = {

  /**
   * @description
   * The UUID of the clip.
   */
  id: string

  /**
   * @description
   * The timestamp of the creation of the clip.
   */
  creationTime: number

  /**
   * @description
   * The title of the clip.
   */
  title: string

  /**
   * @description
   * The clipped content.
   */
  content: string

  /**
   * @description
   * The type of the clipped content.
   */
  type: ClipType

  /**
   * @description
   * Relevant tags.
   */
  tags: Array<TTag>

  /**
   * @description
   * If the clip is sensitive/private/secret.
   */
  sensitive: boolean
};
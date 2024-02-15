import type { TTag } from './tag.type';



/**
 * @description
 * Clipped content definition.
 */
export type TClip = {

  /**
   * @description
   * The UUID of the clip.
   */
  id: string;

  /**
   * @description
   * The title of the clip.
   */
  title: string;

  /**
   * @description
   * The clipped content.
   */
  content: string | Blob;

  /**
   * @description
   * Relevant tags.
   */
  tags: Array<TTag>;

  /**
   * @description
   * If the clip is sensitive/private/secret.
   */
  sensitive: boolean;
};
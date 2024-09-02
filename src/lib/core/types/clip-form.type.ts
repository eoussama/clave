import type { TTag } from './tag.type';



/**
 * @description
 * Clip form definition
 */
export type TClipForm = {
  title: string;
  content: string;
  sensitive: boolean;
  tags: Array<TTag>;
};
import type { TTag } from './tag.type';



export type TClip = {
  id: string;
  title: string;
  content: string | Blob;
  tags: Array<TTag>;
  sensitive: boolean;
};
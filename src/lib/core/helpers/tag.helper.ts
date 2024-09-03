import { v4 as uuid } from 'uuid';
import type { TTag } from '../types/tag.type';



export class TagHelper {

  /**
   * @description
   * Creates a new tag object
   *
   * @param name The name of the tag
   * 
   * @throws Error if the name is empty
   */
  static create(name: string): TTag {
    if (name.trim().length === 0) {
      throw new Error('Tag name cannot be empty');
    }

    return { id: uuid(), text: name.toLowerCase() };
  }
}
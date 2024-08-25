export class EnumHelper {

  /**
   * @description
   * Converts an enum to an object
   *
   * @param enum The enum in question
   */
  static toObject(enumValue: any): any {
    return Object
      .keys(enumValue)
      .reduce((obj: any, key: any) => {
        const index = enumValue[key];

        if (isNaN(index)) {
          obj[index] = parseInt(key);
        }

        return obj;
      }, {});
  }
}
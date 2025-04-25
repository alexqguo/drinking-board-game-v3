/* eslint-disable @typescript-eslint/no-explicit-any */
interface TranslationSchema {
  [key: string]: string;
}

export const createI18n = (schema: TranslationSchema) => {
  const getMessage = (key: string = '', opts: { [key: string]: any } = {}): string => {
    if (!key) return key;
    let result = schema[key];

    for (const [key, value] of Object.entries(opts)) {
      const regex = new RegExp(`{${key}}`, 'g');
      result = result?.replace(regex, value);
    }

    return result || key;
  };

  return {
    getMessage,
    getNullableMessage: (key: string = '', opts: { [key: string]: any } = {}) => {
      const result = getMessage(key, opts);
      if (result === key) return null;
      return result;
    },
  };
};

export enum Locale {
  en = 'en',
}

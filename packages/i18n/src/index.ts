interface TranslationSchema {
  [key: string]: string
}

export const createI18n = (schema: TranslationSchema) => {
  return {
    // eslint-disable-next-line
    getMessage: (key: string = '', opts: { [key: string]: any } = {}): string => {
      if (!key) return key;
      let result = schema[key];

      for (const [key, value] of Object.entries(opts)) {
        const regex = new RegExp(`{${key}}`, 'g')
        result = result?.replace(regex, value);
      }

      return result || key;
    }
  };
};

export enum Locale {
  en = 'en',
}
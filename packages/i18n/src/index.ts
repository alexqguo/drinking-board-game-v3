interface TranslationSchema {
  [key: string]: string
}

export const createI18n = (schema: TranslationSchema) => {
  return {
    getMessage: (key: string, opts: { [key: string]: any } = {}): string => {
      let result = schema[key];

      for (let [key, value] of Object.entries(opts)) {
        const regex = new RegExp(`{${key}}`, 'g')
        result = result?.replace(regex, value);
      }

      return result || key;
    }
  };
};
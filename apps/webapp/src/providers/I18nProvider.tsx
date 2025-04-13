import { createI18n, Locale } from '@repo/i18n';
import en from '@repo/i18n/translations/en.json' with { type: 'json' };
import { LocalizationProvider } from '@repo/react-ui/context/LocalizationContext.jsx';
import { FC, ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode
}

const i18n = createI18n(en);

export const I18nProvider: FC<Props> = ({ children }) => {
  const [locale] = useState<Locale>(Locale.en);

  useEffect(() => {
    // TODO - fetch new json and create new i18n
  }, [locale]);

  return (
    <LocalizationProvider i18n={i18n}>
      {children}
    </LocalizationProvider>
  )
}
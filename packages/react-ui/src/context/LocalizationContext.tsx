import { createContext, ReactNode, useContext, useMemo } from 'react';

export interface I18n {
  getMessage: (key: string | undefined) => string
}

// In the future, more things could be added to this like locale
type LocalizationContext = I18n;

interface ProviderProps {
  children: ReactNode,
  i18n: I18n
}

const LocalizationContext = createContext<LocalizationContext>({
  getMessage: () => ''
});

export const LocalizationProvider = ({ children, i18n }: ProviderProps) => {
  const memoizedValue = useMemo(() => (i18n), [i18n]);

  return (
    <LocalizationContext.Provider value={memoizedValue}>
      {children}
    </LocalizationContext.Provider>
  )
}

export const useI18n = () => useContext(LocalizationContext);
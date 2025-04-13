import { createContext, ReactNode, useContext, useMemo } from 'react';

interface I18n {
  getMessage: (key: string) => string
}

interface LocalizationContext {
  i18n: I18n
}

interface ProviderProps {
  children: ReactNode,
  i18n: I18n
}

const LocalizationContext = createContext<LocalizationContext>({
  i18n: { getMessage: () => '' }
});

export const LocalizationProvider = ({ children, i18n }: ProviderProps) => {
  const memoizedValue = useMemo(() => ({ i18n }), [i18n]);

  return (
    <LocalizationContext.Provider value={memoizedValue}>
      {children}
    </LocalizationContext.Provider>
  )
}

export const useI18n = () => useContext(LocalizationContext);
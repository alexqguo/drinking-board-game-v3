const LS_KEY = '__dbg';

export const getLocalStorage = () => {
  initializeLocalStorageIfEmpty();
  return JSON.parse(window.localStorage.getItem(LS_KEY)!);
}

export const setLocalStorage = (key: string, value: string) => {
  const ls = getLocalStorage();
  ls[key] = value;
  window.localStorage.setItem(LS_KEY, JSON.stringify(ls));
}

export const initializeLocalStorageIfEmpty = () => {
  if (!doesLocalStorageExist()) {
    window.localStorage.setItem(LS_KEY, '{}');
  }
}

export const doesLocalStorageExist = () => {
  try {
    const value = window.localStorage.getItem(LS_KEY);
    if (value === null) return false;

    JSON.parse(value as string);
    return true;
  } catch {
    return false;
  }
}
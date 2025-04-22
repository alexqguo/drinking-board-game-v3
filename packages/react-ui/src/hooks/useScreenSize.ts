import { useEffect, useMemo, useState } from 'react';

const MOBILE_BREAKPOINT = 768;
const THROTTLE_MS = 50;

interface ScreenSize {
  windowWidth: number;
  screenSize: 's' | 'l';
}

export const useScreenSize = (): ScreenSize => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, THROTTLE_MS);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const screenSize: ScreenSize = useMemo(() => {
    return {
      windowWidth,
      screenSize: windowWidth < MOBILE_BREAKPOINT ? 's' : 'l'
    };
  }, [windowWidth]);

  return screenSize;
};
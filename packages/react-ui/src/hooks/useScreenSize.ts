import { useEffect, useMemo, useState } from 'react';

const MOBILE_BREAKPOINT = 768;
const THROTTLE_MS = 100;

export const useScreenSize = (): 's' | 'l' => {
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

  const screenSize = useMemo(() => {
    if (windowWidth < MOBILE_BREAKPOINT) return 's';
    return 'l';
  }, [windowWidth]);

  return screenSize;
};
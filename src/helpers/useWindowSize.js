import { useEffect, useState } from 'react';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize(window.innerWidth);
      }, 200);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};

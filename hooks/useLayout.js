import { useEffect, useState } from 'react';

import { MEDIA_CONDITION_LG, MEDIA_CONDITION_MD } from '@/constants/breakpoint';

const useLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const matchLG = window.matchMedia(MEDIA_CONDITION_LG).matches;
      const matchMD = window.matchMedia(MEDIA_CONDITION_MD).matches;
      setIsDesktop(matchLG);
      setIsTablet(!matchLG && matchMD);
      setIsMobile(!matchLG && !matchMD);
    });

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};

export default useLayout;

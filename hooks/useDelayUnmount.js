import { useEffect, useState } from 'react';

const useDelayUnmount = (isOpen, delay = 1000) => {
  const [isMounted, setIsMounted] = useState(isOpen);

  useEffect(() => {
    let timer;

    if (isOpen) {
      setIsMounted(true);
    } else {
      timer = setTimeout(() => {
        setIsMounted(false);
      }, delay);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen, delay]);

  return isMounted;
};

export default useDelayUnmount;

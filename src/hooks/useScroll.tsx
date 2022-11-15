import { useState, useEffect, useCallback, useRef } from 'react';
import { Product } from '../types/product';

function useFetch(setPage: React.Dispatch<React.SetStateAction<number>>) {
  const loader = useRef(null);

  const handleObserver = useCallback((entries: any) => {
    const target = entries[0];

    if (target.isIntersecting && target.boundingClientRect.top > 100) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 1,
    };

    if (!loader.current) return;

    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) observer.disconnect();
    };
  }, [handleObserver, loader]);

  return { loader };
}

export default useFetch;

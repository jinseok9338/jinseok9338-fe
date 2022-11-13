import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import ProductList from '../components/ProductList';

import useFetch from '../hooks/useScroll';
import { useRouter } from 'next/router';
import { useInfiniteProducts } from '../context/scrollContext';

interface InfiniteScrollPageProps {
  page: string;
}

const InfiniteScrollPage: NextPage<InfiniteScrollPageProps> = () => {
  const { products, setPage } = useInfiniteProducts();

  const loader = useRef(null);

  const handleObserver = useCallback((entries: any) => {
    const target = entries[0];
    console.log(target);
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

  return (
    <>
      <Container>
        <ProductList products={products} />
        <div ref={loader} />
      </Container>
    </>
  );
};

export default InfiniteScrollPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;

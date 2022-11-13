import type { NextPage } from 'next';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ProductList from '../components/ProductList';
import { useInfiniteProducts } from '../context/scrollContext';
import ErrorPage from './error';

interface InfiniteScrollPageProps {
  page: string;
}

const InfiniteScrollPage: NextPage<InfiniteScrollPageProps> = () => {
  const { products, setPage, loading, error } = useInfiniteProducts();

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

  return (
    <>
      <Container>
        {products ? (
          <>
            <ProductList products={products} />
            <div ref={loader} />
          </>
        ) : loading ? (
          <>Loading...</>
        ) : error ? (
          <ErrorPage text='존재하지 않는 페이지 입니다.' />
        ) : null}
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

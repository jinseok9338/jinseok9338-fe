import type { NextPage } from 'next';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ProductList from '../components/ProductList';
import { useInfiniteProducts } from '../context/scrollContext';
import useScroll from '../hooks/useScroll';
import ErrorPage from './error';

interface InfiniteScrollPageProps {
  page: string;
}

const InfiniteScrollPage: NextPage<InfiniteScrollPageProps> = () => {
  const { products, setPage, loading, error } = useInfiniteProducts();
  const { loader } = useScroll(setPage);

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

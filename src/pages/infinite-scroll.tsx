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
  const { products, loader } = useInfiniteProducts();

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

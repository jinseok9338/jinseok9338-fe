import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import ProductList from '../components/ProductList';

import { useScroll } from '../hooks/useScroll';
import { useRouter } from 'next/router';

interface InfiniteScrollPageProps {
  page: string;
}

const InfiniteScrollPage: NextPage<InfiniteScrollPageProps> = () => {
  const { products, handleScroll } = useScroll();
  const router = useRouter();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', handleScroll);
  }, []);

  return (
    <>
      <Container onScroll={handleScroll}>
        <ProductList products={products} />
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

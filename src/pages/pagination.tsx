import { useRouter } from 'next/router';
import Link from 'next/link';
import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import { Product } from '../types/product';
import { usePagination } from '../hooks/usePagination';
import ErrorPage from './error';

interface PaginationPageProps {
  page: string;
}

const PaginationPage: NextPage<PaginationPageProps> = ({ page }) => {
  const { products } = usePagination(page);

  return (
    <>
      <Container>
        {products ? (
          <>
            <ProductList products={products?.slice(0, 10)} />
            <Pagination page={page} />
          </>
        ) : (
          <ErrorPage />
        )}
      </Container>
    </>
  );
};

export default PaginationPage;

// export async function getServerSideProps(context) {
//   const { page } = context.query;
//   // insert the api logic here to fetch props serverside, which I think will be a better option
//   const data = await res.json();
//   const products = data.products as Product[];
//   return {
//     props: { products }, // will be passed to the page component as props
//   };
// }

export async function getServerSideProps(context: any) {
  const { page } = context.query;
  return {
    props: { page }, // will be passed to the page component as props
  };
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;

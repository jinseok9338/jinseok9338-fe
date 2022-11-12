import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import products from '../../api/data/products.json';
import { useProductDetail } from '../../hooks/useProductDetail';
import { addComma } from '../../utilities';
import ErrorPage from '../error';
import { useRouter } from 'next/router';

interface ProductDetailPageProps {
  id: string;
}

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ id }) => {
  const { product } = useProductDetail(id);

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log('App is changing to: ', url);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  return (
    <>
      {product ? (
        <>
          <Thumbnail src={product?.thumbnail ? product.thumbnail : '/defaultThumbnail.jpg'} />
          <ProductInfoWrapper>
            <Name>{product?.name}</Name>
            <Price>{product?.price && addComma(product?.price)}원</Price>
          </ProductInfoWrapper>
        </>
      ) : (
        <ErrorPage text={'존재하지 않는 상품입니다.'} />
      )}
    </>
  );
};

export default ProductDetailPage;

//get the product id from the url
export async function getServerSideProps(context: any) {
  const { id } = context.query;
  return {
    props: { id }, // will be passed to the page component as props
  };
}

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.span`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.span`
  // this needs to be watched further
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;

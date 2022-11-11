import Link from 'next/link';
import styled from 'styled-components';

import { Product } from '../types/product';
import { addComma } from '../utilities';

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product: { name, thumbnail, price, id } }: ProductItemProps) => (
  <Container>
    <Link href={`/products/${id}`}>
      <Thumbnail src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'} />
    </Link>
    <Link href={`/products/${id}`}>
      <Name>{name}</Name>
    </Link>
    <Price>{addComma(price)}원</Price>
  </Container>
);

export default ProductItem;

const Container = styled.a`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 180px;
`;

const Name = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.div`
  margin-top: 4px;
`;

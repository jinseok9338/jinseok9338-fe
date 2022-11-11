import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { Product } from '../types/product';
import { addComma } from '../utilities';

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product: { name, thumbnail, price, id } }: ProductItemProps) => {
  const router = useRouter();

  return (
    <Container>
      <Thumbnail
        onClick={() => {
          //redirect to the product detail page
          router.push(`/products/${id}`);
        }}
        src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'}
        height={180}
        width={180}
        loading='lazy'
      />

      <Link href={`/products/${id}`}>
        <Name>{name}</Name>
      </Link>
      <Price>{addComma(price)}원</Price>
    </Container>
  );
};

export default ProductItem;

const Container = styled.a`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
`;

const Thumbnail = styled(Image)`
  width: 100%;
`;

const Name = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.div`
  margin-top: 4px;
`;

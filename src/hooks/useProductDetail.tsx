import { useEffect, useState } from 'react';
import { Product } from '../types/product';

export const useProductDetail = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async (page: string) => {
      const res = await fetch(`/products/${id}`);
      const data = await res.json();
      const product = data.data?.product as Product;
      setProduct(product);
    };
    fetchProducts(id);
  }, [id]);

  return { product };
};

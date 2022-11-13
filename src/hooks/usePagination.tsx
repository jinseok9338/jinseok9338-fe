import { useCallback, useEffect, useState } from 'react';
import { Product } from '../types/product';

export const usePagination = (page: string, size = 10) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async (page: string) => {
      const res = await fetch(`/products?page=${page}&size=${size}`);
      const data = await res.json();
      const products = data.data?.products as Product[];
      const number = data.data?.totalCount as number;
    };
    fetchProducts(page);
  }, [page]);

  return { products };
};

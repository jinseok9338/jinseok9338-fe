import { useEffect, useState } from 'react';
import { Product } from '../types/product';

export const usePagination = (page: string) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async (page: string) => {
      const res = await fetch(`/products?page=${page}&size=10`);
      const data = await res.json();
      const products = data.data?.products as Product[];
      setProducts(products);
    };
    fetchProducts(page);
  }, [page]);

  return { products };
};

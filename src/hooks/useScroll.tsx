import { useEffect, useState } from 'react';
import { Product } from '../types/product';

export const useScroll = (size = 16) => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      fetchProducts();
    }
  };

  const fetchProducts = async () => {
    const res = await fetch(`/products?size=${size}`);
    const data = await res.json();
    const newProducts = data.data?.products as Product[];

    setProducts([...products, ...newProducts]);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, handleScroll };
};

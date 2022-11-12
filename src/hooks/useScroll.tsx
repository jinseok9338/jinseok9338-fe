import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types/product';

function useFetch(size: number = 16, page: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      console.log(page);
      const res = await fetch(`/products?page=${page}&size=${size}`); // needs query
      const data = await res.json();
      const newProducts = data.data?.products as Product[];
      setProducts([...products, ...newProducts]);
      setLoading(false);
    } catch (e) {
      setError(true);
    }
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, [page, fetchProducts, size]);

  return { loading, error, products };
}

export default useFetch;

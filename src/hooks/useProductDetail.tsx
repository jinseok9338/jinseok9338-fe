import { useEffect, useState } from 'react';
import { Product } from '../types/product';

export const useProductDetail = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    try {
      const fetchProducts = async (page: string) => {
        setLoading(true);
        const res = await fetch(`/products/${id}`);
        const data = await res.json();
        const product = data.data?.product as Product;
        setProduct(product);
        setLoading(false);
      };

      fetchProducts(id);
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  }, [id]);

  return { product, loading, error };
};

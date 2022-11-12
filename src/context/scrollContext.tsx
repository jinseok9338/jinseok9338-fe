// prodcuts context api
// Path: src/context/productsContext.tsx
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Product } from '../types/product';

type ProductsContextType = {
  products: Product[];
  loading: boolean;
  error: boolean;
  handleObserver: (entries: any) => void;
};

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  loading: false,
  error: false,
  handleObserver: () => {},
});

export const useInfiniteProducts = () => useContext(ProductsContext);

export const InfiniteProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = useCallback(async () => {
    if (!hasMore) return;
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`/products?page=${page}&size=${16}`); // needs query
      const data = await res.json();
      const newProducts = data.data?.products as Product[];
      setProducts([...products, ...newProducts]);
      setLoading(false);
    } catch (e) {
      setError(true);
      setHasMore(false);
    }
  }, [page]);

  const handleObserver = useCallback((entries: any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page, fetchProducts]);

  return (
    <ProductsContext.Provider value={{ products, loading, error, handleObserver }}>
      {children}
    </ProductsContext.Provider>
  );
};

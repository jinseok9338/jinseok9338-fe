// prodcuts context api
// Path: src/context/productsContext.tsx
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Product } from '../types/product';

type ProductsContextType = {
  products: Product[];
  loading: boolean;
  error: boolean;
  handleObserver: (entries: any) => void;
  scrollPosition: number;
};

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  loading: false,
  error: false,
  handleObserver: () => {},
  scrollPosition: 0,
});

export const useInfiniteProducts = () => useContext(ProductsContext);

export const InfiniteProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const fetchProducts = useCallback(async () => {
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
    <ProductsContext.Provider value={{ products, loading, error, handleObserver, scrollPosition }}>
      {children}
    </ProductsContext.Provider>
  );
};

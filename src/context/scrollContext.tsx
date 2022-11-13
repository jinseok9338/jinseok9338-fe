// prodcuts context api
// Path: src/context/productsContext.tsx
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Product } from '../types/product';

type ProductsContextType = {
  products: Product[];
  loading: boolean;
  error: boolean;
  loader: any;
};

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  loading: false,
  error: false,
  loader: null,
});

export const useInfiniteProducts = () => useContext(ProductsContext);

export const InfiniteProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  const fetchProducts = useCallback(async () => {
    if (!hasMore) return;
    try {
      setLoading(true);
      const res = await fetch(`/products?page=${page}&size=${16}`); // needs query
      const data = await res.json();
      const newProducts = data.data?.products as Product[];
      setProducts([...products, ...newProducts]);
      setLoading(false);
    } catch (e) {
      setHasMore(false);
    }
  }, [page]);

  useEffect(() => {
    if (products.length >= 105) {
      setHasMore(false);
    }
  }, [products]);

  const handleObserver = useCallback((entries: any) => {
    const target = entries[0];
    if (target.isIntersecting && target.boundingClientRect.top > 100) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) observer.unobserve(loader.current!);
    };
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <ProductsContext.Provider value={{ products, loading, error, loader }}>
      {children}
    </ProductsContext.Provider>
  );
};

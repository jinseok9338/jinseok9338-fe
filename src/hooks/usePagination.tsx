import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Product } from '../types/product';

export const usePagination = (page: string, size = 10) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState<number[]>([]);
  const [lastPageNumber, setLastPageNumber] = useState(0);
  const [error, setError] = useState(false);

  const router = useRouter();

  // const clickNextButton = () => {
  //   //if the page is the last index of pages go to the next page
  //   if (Number(page) === pages[pages.length - 1]) {
  //     router.push(`/pagination?page=${Number(page) + 1}`);
  //   }
  //   //else go to the last index of pages
  //   else {
  //     router.push(`/pagination?page=${pages[pages.length - 1]}`);
  //   }
  // };

  // const clickPreviousButton = () => {
  //   //if the page is the first index of pages go to the previous page
  //   if (Number(page) === pages[0]) {
  //     router.push(`/pagination?page=${Number(page) - 1}`);
  //   }
  //   //else go to the first index of pages
  //   else {
  //     router.push(`/pagination?page=${pages[0]}`);
  //   }
  // };

  const clickNextButton = () => {
    const index = pages[pages.length - 1] + 1;
    router.push(`/pagination?page=${index}`);
  };

  const clickPreviousButton = () => {
    const index = pages[0] - 1;
    router.push(`/pagination?page=${index}`);
  };

  const disableNextButton = (page: string) => {
    // if pages[0] + 5 > lastPageNumber return true else false
    return pages[0] + 5 > lastPageNumber;
  };

  const disablePreviousButton = (page: string) => {
    //if there is no previous pages return true
    if (Number(page) - 5 < 1) {
      return true;
    } else {
      return false;
    }
  };

  const fetchProducts = async (page: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/products?page=${page}&size=${size}`);
      const data = await res.json();
      const products = data.data?.products as Product[];
      setProducts(products);
      const productsCount = data.data?.totalCount as number;

      const totalPages = Array.from(Array(Math.ceil(productsCount / size)).keys()).map(
        (i) => i + 1
      );
      setLastPageNumber(totalPages[totalPages.length - 1]);
      const currentPageGroup = totalPages.slice(
        Math.floor((parseInt(page) - 1) / 5) * 5,
        Math.floor((parseInt(page) - 1) / 5) * 5 + 5
      );
      setPages(currentPageGroup);
      setLoading(false);
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      fetchProducts(page);
    } catch (e) {
      setError(true);
    }
  }, [page]);

  return {
    products,
    pages,
    clickNextButton,
    clickPreviousButton,
    lastPageNumber,
    disableNextButton,
    disablePreviousButton,
    error,
    loading,
  };
};

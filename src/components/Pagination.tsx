import React, { useState } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

import { useRouter } from 'next/router';

interface PaginationProps {
  page: string;
}

const Pagination = ({ page }: PaginationProps) => {
  const router = useRouter();
  const indexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const [currentPages, setCurrentPages] = useState(indexes.slice(0, 5));

  // get 5 numbers after the current page
  const getPagesAfter = (page: number) => {
    if (page + 5 > indexes.length) {
      const pagesAfter = indexes.slice(page, indexes.length);
      setCurrentPages(pagesAfter);
    }
    const pagesAfter = indexes.slice(page, page + 5);
    setCurrentPages(pagesAfter);
  };

  return (
    <Container>
      <Button disabled={page == '1'} onClick={() => router.push(`/pagination?page=${1}`)}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {currentPages.map((index) => (
          <Page
            onClick={() => router.push(`/pagination?page=${index}`)}
            key={index}
            selected={index === parseInt(page)}
            disabled={index === parseInt(page)}
          >
            {index}
          </Page>
        ))}
      </PageWrapper>
      <Button disabled={page == '11'} onClick={() => router.push(`/pagination?page=${5}`)}>
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;

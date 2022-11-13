import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

import { useRouter } from 'next/router';

interface PaginationProps {
  page: string;
  pages: number[];
  clickNextButton: () => void;
  clickPreviousButton: () => void;
  lastPageNumber: number;
  disablePreviousButton: (page: string) => boolean;
  disableNextButton: (page: string) => boolean;
}

const Pagination = ({
  page,
  pages,
  clickNextButton,
  clickPreviousButton,
  lastPageNumber,
  disablePreviousButton,
  disableNextButton,
}: PaginationProps) => {
  const router = useRouter();

  return (
    <Container>
      <Button disabled={disablePreviousButton(page)} onClick={() => clickPreviousButton()}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {pages.map((index) => (
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
      <Button disabled={disableNextButton(page)} onClick={() => clickNextButton()}>
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

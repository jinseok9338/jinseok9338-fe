import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const ErrorPage = () => {
  return (
    <Container>
      <Title>404</Title>
      <Description>존재하지 않는 페이지 입니다.</Description>
      <Link href='/'>
        <StyledButton>홈으로</StyledButton>
      </Link>
    </Container>
  );
};

export default ErrorPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 40px;
`;

const Title = styled.h1`
  font-size: 48px;
`;

const Description = styled.p`
  font-size: 24px;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  margin-top: 40px;
`;

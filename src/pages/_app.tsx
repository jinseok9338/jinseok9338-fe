import type { AppProps } from 'next/app';
import styled from 'styled-components';

import setupMSW from '../api/setup';
import { AuthProvider } from '../context/authContext';
import GlobalStyle from '../styles/GlobalStyle';

setupMSW();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <GlobalStyle />
        <Background />
        <Content>
          <Component {...pageProps} />
        </Content>
      </AuthProvider>
    </>
  );
}

export default MyApp;

const Background = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #f0f0f5;
`;

const Content = styled.div`
  width: 420px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;

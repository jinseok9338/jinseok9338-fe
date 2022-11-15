import type { AppProps } from 'next/app';
import styled from 'styled-components';

import setupMSW from '../api/setup';
import Layout from '../components/Layout';
import { AuthProvider } from '../context/authContext';
import { InfiniteProductsProvider } from '../context/scrollContext';
import GlobalStyle from '../styles/GlobalStyle';
import { CookiesProvider } from 'react-cookie';
import { parseCookies } from '../utilities';
setupMSW();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <CookiesProvider> */}
      <AuthProvider>
        <InfiniteProductsProvider>
          <GlobalStyle />
          <Background />
          <Content>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Content>
        </InfiniteProductsProvider>
      </AuthProvider>
      {/* </CookiesProvider> */}
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

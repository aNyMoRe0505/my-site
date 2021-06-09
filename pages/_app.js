/* eslint-disable react/prop-types */
import Head from 'next/head';
import { useEffect } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { createGlobalStyle } from 'styled-components';

import SharedLayout from '../components/SharedLayout';

const GlobalStyle = createGlobalStyle`
  * {
    -webkit-tap-highlight-color: transparent;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
    font-family: 'Noto Sans', 'Noto Sans TC', sans-serif;
  }

  body {
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;
  }
`;

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Paul's Blog" />
        <title>Paul&apos;s Blog</title>
      </Head>
      <SharedLayout>
        <Component {...pageProps} />
      </SharedLayout>
    </>
  );
}

export default MyApp;

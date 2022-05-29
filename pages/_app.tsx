import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import Script from 'next/script'
// Modules
import { AppProps } from 'next/app';

// import * as gtag from "../lib/gtag";
const isProduction = process.env.NODE_ENV === "production";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {

  return (
    <ChakraProvider>
      <Script id="my-script" src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      <Component {...pageProps} />

    </ChakraProvider>
  );
};

export default MyApp;
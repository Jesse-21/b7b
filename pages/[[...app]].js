import { HashRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../src/helpers/create-theme";
import { AppRoutes } from "../src/AppRoutes";
import Head from "next/head";
import { useRouter } from "next/router";

function SEO({ description, title, siteTitle }) {
  return (
    <Head>
      <title>{`${title} `}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Head>
  );
}

import { useState, useEffect } from "react";

function App() {
  const [isMounted, setIsMounted] = useState(false);

  const SSR_SEO = (
    <SEO
      title={"B7B, an open-source BEB dimension browser"}
      description="B7B is an open-source BEB dimension browser for the open BEB protocol"
    />
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return SSR_SEO;
  }

  return (
    <>
      {SSR_SEO}
      <ChakraProvider theme={theme}>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </ChakraProvider>
    </>
  );
}

export default App;

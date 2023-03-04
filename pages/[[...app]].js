import { HashRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../src/helpers/create-theme";
import { AppRoutes } from "../src/AppRoutes";

import { useState, useEffect } from "react";

function App() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ChakraProvider theme={theme}>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;

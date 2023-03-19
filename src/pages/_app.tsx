import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Provider from "./auth/provaider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

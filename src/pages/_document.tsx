import { Html, Head, Main, NextScript } from "next/document";
import React from "react";
import Provider from "./auth/provaider";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

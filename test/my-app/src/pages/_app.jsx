import React from "react";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Component {...pageProps} />
    </React.Fragment>
  );
}

import "../styles/globals.css";
import LatOut from "../components/layout";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider>
      <LatOut>
        <Component {...pageProps} />
      </LatOut>
    </SessionProvider>
  );
}

export default MyApp;

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2855644548984078"
          crossorigin="anonymous"
        ></script>
        <meta
          name="google-site-verification"
          content="lq1wuARJxA0OumwA6ULgrXB6O88FMlADh5oCKkfmKZE"
        />
      </Head>
      <body className="bg-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

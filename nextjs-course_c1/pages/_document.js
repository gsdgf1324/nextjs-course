import Documnet, { Html, Head, Main, NextScript } from "next/document";

class MyDocumnet extends Documnet {
  render() {
    return (
      <Html lang="kr">
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="overlays" />
        </body>
      </Html>
    );
  }
}

export default MyDocumnet;

// https://velog.io/@hjkdw95/Next.js-app.js%EC%99%80-document.js%EC%9D%98-%EC%B0%A8%EC%9D%B4

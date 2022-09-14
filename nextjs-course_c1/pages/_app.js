import "../styles/globals.css";
import Layout from "../components/layout/layout";

import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* // 반응형 페이지의 스케일을 적정값으로 만드는 데 자주 쓰이는 태그 */}
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

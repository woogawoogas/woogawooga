import DefaultHead from "@/utils/defaultHead";
import { Main, NextScript, Head, Html } from "next/document";
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <DefaultHead />
        </Head>
        <header>s</header>
        <Main />
        <NextScript />
        <footer>ㅇ</footer>
      </Html>
    );
  }
}

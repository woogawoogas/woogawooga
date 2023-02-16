import DefaultHead from "@/utils/defaultHead"
import {Main, NextScript, Head, Html} from "next/document"
import {ServerStyleSheet} from " styled-components "

export default class MyDocument extends Document {
  static async getServerSideProps(ctx) {
    const sheet = new ServerStyleSheet()
  }

  render() {
    return (
      <Html lang='ko'>
        <Head>
          <DefaultHead />
        </Head>
        <header></header>
        <Main />
        <NextScript />
        <footer></footer>
      </Html>
    )
  }
}

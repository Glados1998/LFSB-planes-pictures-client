import {Head, Html, Main, NextScript} from 'next/document'

export default function Document({__NEXT_DATA__}) {
  return (
      <Html lang={__NEXT_DATA__.locale || "fr"}>
        <Head>
            <link rel="icon" href="/assets/icons8-plane-16.ico" sizes="any"/>
        </Head>
        <body>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  )
}

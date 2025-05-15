import {Head, Html, Main, NextScript} from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
        <Head>
            <title>LFSB Planes Pictures</title>
            <meta name="description"
                  content="a private gallery capturing the dynamic spirit of aviation at EuroAirport Basel-Mulhouse-Freiburg – a crossroads of cultures and aeronautical innovation."/>
            <meta name="keywords"
                  content="aviation, avion, plane, aircraft, aéronef, aéroport, airport, Basel, Mulhouse, Freiburg, Bâle, Mulhouse, Fribourg, LFSB, LSZM, LSGG, LSZH, LFSB Planes Pictures, LFSB Planes, LFSB, LFSB Spotting, LFSB Aviation, LFSB Avion, LFSB Avions, LFSB Avions Photos, LFSB Photos, LFSB Photos Avions, LFSB Photos Avion"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link rel="icon" href="/assets/icons8-plane-16.ico" sizes="any"/>
        </Head>
        <body>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  )
}

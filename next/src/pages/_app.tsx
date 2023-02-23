import 'prism-themes/themes/prism-vsc-dark-plus.css'
import '@/styles/globals.css'
import '@/styles/markdown.scss'

import type { AppProps } from 'next/app'
import { Footer } from '@/components/Footer'
import Head from 'next/head'
import { Header } from '@/components/Header'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="description" content="" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta property="og:title" content="" />
      <meta property="og:description" content="" />
      <meta property="og:image" content="" />
      <meta name="twitter:card" content="" />
      <meta name="twitter:site" content="" />
      <meta name="twitter:title" content="" />
      <meta name="twitter:description" content="" />
      <meta name="twitter:image" content="" />

      <link rel="icon" href="/img/favicon.png" sizes="any" />
      <link rel="icon" href="/img/logo_round.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/img/favicon.png" />

      <title>dotwildcard</title>
    </Head>
    <Component {...pageProps} />
  </>
}

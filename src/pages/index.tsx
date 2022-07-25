import type { NextPage } from 'next'
import Head from 'next/head'
import { IndexPage } from "../templates"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0"/>
        <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
        <meta name="description" content="Bingo Machine"/>
        <meta name="author" content="ROhta"/>
        <meta name="robots" content="noindex, nofollow"/>
        <meta property="og:title" content="Bingo Machine"/>
        <meta property="og:description" content="A Bingo Machine for Party"/>
        <meta property="og:site_name" content="Bingo Machine"/>
        <meta property="og:url" content="https://rohta.github.io/bingo_next/"/>
        <meta property="og:image" content="https://rohta.github.io/bingo_next/ogp.png"/>
        <meta property="og:locale" content="ja_JP"/>
        <meta property="og:type" content="game"/>
        <title>Bingo Machine</title>
        <link rel="icon" href="logo.ico"/>
      </Head>
      <IndexPage />
    </>
  )
}

export default Home

import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import styled from "styled-components"
import IndexPage from "../templates/Index"

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0"/>
        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        <meta name="description" content="Bingo Machine"/>
        <meta name="author" content="ROhta"/>
        <meta name="robots" content="noindex, nofollow"/>
        <meta property="og:title" content="Bingo Machine"/>
        <meta property="og:description" content="A Bingo Machine for Party"/>
        <meta property="og:site_name" content="Bingo Machine"/>
        <meta property="og:url" content="https://rohta.github.io/bingo/"/>
        <meta property="og:image" content="https://rohta.github.io/bingo/ogp.png"/>
        <meta property="og:locale" content="ja_JP"/>
        <meta property="og:type" content="game"/>
        <title>Bingo Machine</title>
        <link rel="icon" href="./logo.ico"/>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css?family=MedievalSharp&amp;subset=latin-ext" rel="stylesheet"/>
      </Head>

      <main>
        <IndexPage />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
        <script src="./js/numberList.js" defer></script>
        <script src="./js/domManipulation.js" defer></script>
        <script src="./js/root.js" defer></script>
      </main>
    </div>
  )
}

const BingoNumber = styled.p`
  font-size: 55vmin
`

export default Home

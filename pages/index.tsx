import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

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
        <meta property="og:image" content="https://rohta.github.io/bingo/materials/ogp.png"/>
        <meta property="og:locale" content="ja_JP"/>
        <meta property="og:type" content="game"/>
        <title>Bingo Machine</title>
        <link rel="icon" href="./materials/logo.ico"/>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css?family=MedievalSharp&amp;subset=latin-ext" rel="stylesheet"/>
      </Head>

      <main className="container bg-dark text-white h-100" style="font-family: 'MedievalSharp', cursive">
        <div className="row">
          <section className="col-sm text-center">
            <p id="bingo-number" style="font-size: 55vmin"></p>
            <button type="button" id="start-button" className="btn btn-lg btn-secondary px-5 py-4"></button>
            <button type="button" id="reset-button" className="btn btn-lg btn-secondary px-1 py-4"></button>
          </section>
          <section className="col-sm h1">
            <p id="history-title" className="py-5"></p>
            <div id="history-display" className="row"></div>
          </section>
        </div>

        <audio id="drum" preload="auto" src="./materials/drumroll.mp3"></audio>
        <audio id="cymbals" preload="auto" src="./materials/cymbals.mp3"></audio>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                crossOrigin="anonymous"></script>

        <script src="./js/numberList.js" defer></script>
        <script src="./js/domManipulation.js" defer></script>
        <script src="./js/index.js" defer></script>
      </main>
    </div>
  )
}

export default Home

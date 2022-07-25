import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="ja">
                <Head prefix="og:http://ogp.me/ns#" ></Head>
                <body className={`bg-black text-white font-medievalsharp`}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
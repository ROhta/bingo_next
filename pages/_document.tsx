import Document, { Html, Head, Main, NextScript } from 'next/document';
import styled from "styled-components"

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="ja">
                <Head prefix="og:http://ogp.me/ns#" />
                <Body className="container bg-dark text-white h-100">
                    <Main />
                    <NextScript />
                </Body>
            </Html>
        );
    }
}

const Body = styled.body`
  font-family: 'MedievalSharp', cursive
`

export default MyDocument;
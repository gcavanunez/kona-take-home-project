import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html className="h-full bg-gray-50">
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic%7CPoppins:regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="h-full font-montserrat">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

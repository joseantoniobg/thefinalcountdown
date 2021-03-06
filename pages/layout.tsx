import Head from "next/head"

const Layout = ({children}) => {
  return (<>
            <Head>
              <title>The final Countdown</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet" />
              <link href="/images/icon.png" rel="icon" />
            </Head>
            <div>
                {children}
            </div>
          </>)
}

export default Layout;
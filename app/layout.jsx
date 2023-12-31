import "@styles/globals.css"

import dynamic from "next/dynamic"
import Head from "next/head"

// import Nav from "@components/Nav"
// import Provider from "@components/Provider"
const Nav = dynamic(() => import("@components/Nav"))
const Provider = dynamic(() => import("@components/Provider"))

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Head>
          <link rel='icon' href='/favicon.ico' />
          <link
            href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap'
            rel='stylesheet'
          />
        </Head>
      </head>
      <body>
        <Provider prefetch={false}>
          <div className='main'>
            <div className='gradient' />
          </div>
          <main className='app'>
            <Nav prefetch={false} />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout

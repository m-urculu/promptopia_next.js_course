import "@styles/globals.css"

// import Nav from "@components/Nav"
// import Provider from "@components/Provider"
import dynamic from "next/dynamic"

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

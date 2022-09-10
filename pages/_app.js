//import '../styles/globals.css'
import Layout from '../components/Layout'
import {
  ChakraProvider,
} from "@chakra-ui/react"
import theme from '../themes/theme';
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>        
        </SessionProvider>
    </ChakraProvider>
  )
}

export default MyApp

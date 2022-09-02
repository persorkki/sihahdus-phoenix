//import '../styles/globals.css'
import Layout from '../components/Layout'
import {
  ChakraProvider,
} from "@chakra-ui/react"
import theme from '../themes/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp

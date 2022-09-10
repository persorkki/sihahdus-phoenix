import Head from 'next/head'

import {
  Grid,
  GridItem,

} from '@chakra-ui/react'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sihahdus</title>
        <meta name="description" content="Sihahdus" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid templateColumns={'repeat(7,200px)'} gap={"4"} alignItems="center" >
        
      </Grid>
    </div>
  )
}

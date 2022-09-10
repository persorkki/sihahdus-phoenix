import { getCsrfToken, signIn} from "next-auth/react";

import {
  Input,
  Center,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
    Button,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function SignIn({ csrfToken }) {
    const [inputValue, setInputValue] = useState("");

  return (
    <Grid
      templateColumns={"repeat(7,200px)"}
      gap={"4"}
      alignItems="center"
      marginTop={4}
    >
      <GridItem colStart={"4"} colSpan={"1"}>
              <form method="post" action="/api/auth/callback/credentials"
                  onSubmit={(e) => {
                      e.preventDefault()
                      signIn('credentials', {password: inputValue, callbackUrl:`${window.location.origin}/upload`})
                  }}>
                  
          <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <FormLabel mb="4" mr="0" textAlign={"center"}>
            Super secret keyword
                  </FormLabel>
          <Input mb="4" name="password" type="password" onChange={(e) => setInputValue(e.target.value)} />
          <Button w="100%" type="submit">
            Sign in
          </Button>
        </form>
      </GridItem>
    </Grid>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}


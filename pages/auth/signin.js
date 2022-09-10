import { getCsrfToken } from "next-auth/react";

import {
  Input,
  Center,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";

export default function SignIn({ csrfToken }) {
  return (
    <Grid
      templateColumns={"repeat(7,200px)"}
      gap={"4"}
      alignItems="center"
      marginTop={4}
    >
      <GridItem colStart={"4"} colSpan={"1"}>
        <form method="post" action="/api/auth/callback/credentials">
          <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <FormLabel mb="4" mr="0" textAlign={"center"}>
            Super secret keyword
          </FormLabel>
          <Input mb="4" name="password" type="password" />
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


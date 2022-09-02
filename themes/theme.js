import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}
const styles = {
    global: (props) => ({
      'body': {
        bg: props.colorMode === 'dark' ? 'blue.900' : 'blue.50',
        color: props.colorMode === 'dark' ? 'blue.50' : 'blue.900',
      },
    })
}
const components = {
}
const theme = extendTheme({
    config,
    styles,
    components,
})
export default theme
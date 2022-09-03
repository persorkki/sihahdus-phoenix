import {
    Box,
    Center,
} from "@chakra-ui/react"
import Navbar from "./Navbar"

export default function Layout({ children }) {
    return (
        <Center>
        <Box minW={"50%"}>
            <Navbar />
            <Center>
                    {children}
            </Center>    
        </Box>
        </Center>
    )
}
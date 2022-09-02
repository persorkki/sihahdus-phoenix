import {
    Box,
    Center,
} from "@chakra-ui/react"
import Navbar from "./Navbar"

export default function Layout({ children }) {
    return (
        <Center>
        <Box w="70%">
        <Navbar/>
            {children}
            </Box>
        </Center>
    )
}
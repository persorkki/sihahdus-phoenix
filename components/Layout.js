import {
    Box,
    Center,
} from "@chakra-ui/react"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Layout({ children }) {
    return (
        <Center>
        <Box>
            <Navbar />
                {children}
        </Box>
        </Center>
    )
}
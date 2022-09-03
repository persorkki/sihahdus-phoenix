import { SunIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Box,
    Divider,
    IconButton,
    useColorMode,
} from '@chakra-ui/react'
  
export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode()
    
    return (
        <>
        
            <Breadcrumb textAlign={"center"} fontSize="1.5em" p="2" spacing="10" borderRadius={"sm"}>
                <BreadcrumbItem>
                    <NextLink href='/' passHref>
                        <BreadcrumbLink>home</BreadcrumbLink>
                    </NextLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <NextLink href='/blog' passHref>
                        <BreadcrumbLink>blog</BreadcrumbLink>
                    </NextLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <NextLink href='/upload' passHref>
                        <BreadcrumbLink>upload</BreadcrumbLink>
                    </NextLink>
                    </BreadcrumbItem>
            </Breadcrumb>
            <Divider borderColor="white" />
        </>
    )
}

/*
                <BreadcrumbItem>
                        <IconButton onClick={toggleColorMode} aria-label='Dark/Light switch' icon={<SunIcon/>}/>
                </BreadcrumbItem>
*/

import {
    Input,
    Flex,
    Center,
    FormControl,
    FormLabel,
    Button,
    Spinner,
    Image,
    Container,
    Box,
    Grid,
    GridItem,
    Text,
} from '@chakra-ui/react'


export default function Blog() {
    const MB_SIZE = 4;
    return (        
        <Grid templateColumns={'repeat(7,200px)'}  gap={"4"} alignItems="center" marginTop={MB_SIZE}>
        <GridItem colStart={"3"} colSpan={"3"}>

        </GridItem>
        </Grid>
    )
}

export function StatusText({text, color, MB_SIZE}) {
    return (
        <Text mb={MB_SIZE}>
            Status <Text as="span" color={color} fontWeight={"bold"}>{text}</Text>
        </Text>
    )
}
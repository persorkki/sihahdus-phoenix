
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
        
        <Grid templateColumns={'repeat(7,1fr)'} gap={"4"} alignItems="center" marginTop={MB_SIZE}>
        <GridItem colStart={"3"} colSpan={"3"}>
            <FormControl>
                <GridItem align="center">
                    <StatusText text="staattinen" color="red.500" MB_SIZE={MB_SIZE}/>
                    </GridItem>
                    <GridItem align={"center"}>
                        <Text
                            bg={"gray.900"}
                            _hover={{ bg: "gray.700" }}
                            mb={MB_SIZE}>
                            http://localhost:3000/3x - Copy (17).gif
                            </Text>
                    </GridItem>
                    <GridItem>
                        <Text
                            my="4"
                            p="10"
                            align={"center"}
                            htmlFor="fileInput"
                            border={"2px dashed"}
                        >longassuploadtexxttxtxxtxtxttxxttxxtttxxtxtxttxtxxtasdasdadasdasdijasidjsdasdasdsadasd
                            </Text>
                    </GridItem>
                    <Input
                        id="fileInput"
                        type="file"
                        hidden>
                    </Input>      
                <Button w="100%" mb={MB_SIZE}>Upload</Button>
                <Image src="/r.png"></Image>
                </FormControl>
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
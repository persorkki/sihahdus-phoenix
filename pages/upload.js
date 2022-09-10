
import {
    Input,
    Flex,
    Center,
    FormControl,
    FormLabel,
    Button,
    Spinner,
    Image,
    Grid,
    GridItem,
    Text,
    Link
} from '@chakra-ui/react'
import {
    CopyIcon
} from '@chakra-ui/icons'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Upload() {
    const status = {
        DEFAULT: {
            text: "Ready to receive files",
            color: "green.300"
        },
        COPY_TO_CLIPBOARD: {
            text: "URL copied to clipboard!",
            color: "blue.300"
        },

        //file handling
        FILE_READY: {
            text: "File selected and ready to upload",
            color: "green.300",
      },
        FILE_UPLOADING: {
            text: "Uploading...",
            color: "green.500"
        },
        FILE_UPLOAD_SUCCESS: {
            text: "Upload complete!",
            color: "green.300"
        },

        //errors
        FILE_ALREADY_EXISTS: {
            text: "File already exists on server",
            color: "red.300"
        },
        FILE_UPLOAD_FAILED: {
            text: "Upload failed!",
            color: "red.300"
        },
        FILE_SIZE_EXCEEDED: {
            text: "File size exceeded!",
            color: "red.300"
        },

    };

    const defaultUploadText = "drag files here or click to upload";
    const [uploadText, setUploadText] = useState(defaultUploadText)
    const [statusText, setStatusText] = useState(status.DEFAULT)
    const [file, setFile] = useState(null)
    const [fileURI, setFileURI] = useState("")
    const [buttonFlag, setButtonFlag] = useState(false)
    const [loading, setLoading] = useState(false)
    const [drag, setDrag] = useState(false)
    const { data: session } = useSession()

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        const tempText = statusText
        setStatusText(status.COPY_TO_CLIPBOARD)
        setTimeout(() => {
            setStatusText(tempText)
        }, 1000);
    }

    const uploadFile = (e) => {
        setStatusText(status.FILE_UPLOADING)
        setLoading(true)

        let formData = new FormData();
        formData.append("tiedosto", file)

        const headers = {
            'Content-Type': 'multipart/form-data',
        }
        axios.put("/api/upload", formData, headers)
            .then((res) => {
                if (res.status == 200) {
                    //console.log(res);
                    setFileURI(res.data.fileURI)
                    setStatusText(status.FILE_UPLOAD_SUCCESS)
                }
                /*
                else { 
                    setStatusText(status.FILE_UPLOAD_FAILED)
                    throw new Error("connection to upload API failed", { cause: res })
                }
                */
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
                console.log(err.toJSON().status);
                switch (err.toJSON().status)
                {
                    case 413:
                        setStatusText(status.FILE_SIZE_EXCEEDED)
                        break;
                    case 409:
                        setStatusText(status.FILE_ALREADY_EXISTS)
                        setFileURI(err.response.data.fileURI)
                        break;
                    default:
                        setStatusText(status.FILE_UPLOAD_FAILED)
                        break;
                }
                /*
                setStatusText(status.FILE_UPLOAD_FAILED)
                */
                setLoading(false)
            })
        
    }

    useEffect(() => {
        if (file != null) {
            setButtonFlag(true)
        }
        else {
            setButtonFlag(false)
        }
    }, [file])    

    const uploadChange = (e) => {
        e.stopPropagation()
        e.preventDefault()

        let fileObject = {}

        //this function is used click and drag events
        //they have their file data objects in different locations in the response
        if (e.type === "change" && e.target.files[0])
            fileObject = e.target.files[0]
        else if (e.type === "drop" && e.dataTransfer.files[0])
            fileObject = e.dataTransfer.files[0]
        else
            return
        setStatusText(status.FILE_READY)
        setFile(fileObject)
        setUploadText(fileObject.name.length > 52
            ? fileObject.name.slice(0, 45) + "..."
            : fileObject.name)
    }
    const MB_SIZE = 4;
    
    if (!session) {
        return (
            <Grid templateColumns={'repeat(7,200px)'}  gap={"4"} alignItems="center" marginTop={MB_SIZE}>
            
                <GridItem colStart={"4"} colSpan={"1"} textAlign={"center"}>
                    
                    <Text >Access denied</Text>
                    <Button mt="5" w="100%"onClick={() => signIn()}>Log in</Button>
                </GridItem>
            
            </Grid>
        )
    }

    return (
        <Grid templateColumns={'repeat(7,200px)'} gap={"4"} alignItems="center" marginTop={MB_SIZE}
        // these events prevent the default browser action which would open a file
        // in the browser if the file wasn't dropped into our intended dropzone
        onDragOver={(e) => { e.preventDefault() }}
        onDrop={(e) => { e.preventDefault() }} >
            <GridItem colStart={"3"} colSpan={"3"}>
                <FormControl>
                    <GridItem align={"center"}>
                        <StatusText
                            text={statusText.text}
                            color={statusText.color}
                            MB_SIZE={MB_SIZE} />
                    </GridItem>

                    <GridItem>
                        <FormLabel
                            textAlign={"center"}
                            my="4"
                            mr="0"
                            p="10"
                            align="center"
                            htmlFor="fileInput"
                                border={"2px dashed"}
                                _hover={{ color: "gray.500"}}
                            sx={drag ? {
                                "box-shadow": "0 0 0 10000px rgba(0,0,0,.5);",
                                "z-index": "999;"}
                                : { "z-index": "0" }}
                            
                            onDragOver={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                setDrag(true)
                            }}
                            onDragLeave={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                setDrag(false)
                                
                            }}
                            onDrop={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                uploadChange(e)
                                setDrag(false)
                            }}>
                            { loading ? <Spinner /> :  uploadText}
                        </FormLabel>
                    </GridItem>
                    
                    <GridItem>
                        <Input
                            id="fileInput"
                            onChange={uploadChange}
                            type="file"
                            hidden>
                        </Input>  
                    </GridItem>    

                    <GridItem>
                        <Button disabled={!buttonFlag} w="100%" onClick={uploadFile} mb="5">Upload</Button>
                    </GridItem>

                    {fileURI && <PreviewBox fileURI={fileURI} copyToClipboard={copyToClipboard} MB_SIZE={MB_SIZE} />}
                    
                </FormControl>
                </GridItem>
        </Grid>
    )
}

export function Preview(props) {
    return (
        <>
            <Image
                src={props.url}
                alt="preview"
                bg={"gray.900"}
                _hover={{bg:"gray.500"}}
                p="6px"
                minW="50%"
                maxH={"50%"}
                margin={"auto"}
                />
            
        </>
    )
}

export function StatusText({text, color, MB_SIZE}) {
    return (
        <Text mb={MB_SIZE}>
            <Text as="span" color={color} fontWeight={"bold"}>{text}</Text>
        </Text>
    )
}

export function PreviewBox({fileURI, copyToClipboard, MB_SIZE="4"}) {
    return (
        <GridItem
            onClick={() => {copyToClipboard(fileURI)}} colStart={"3"}>
            <Text
                bg={"gray.900"}
                _hover={{ bg: "gray.700", cursor: "copy" }}
                mb={MB_SIZE}
                textAlign={"center"}
                >
                {fileURI}
            </Text>
            <Preview url={fileURI}></Preview>
        </GridItem>
    )
}
//<Image src={props.url} alt="preview" style={{ "border": "1px dotted", "padding" : "0.5em"}}/>

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
    Box
} from '@chakra-ui/react'

import axios from 'axios'
import { calcLength } from 'framer-motion';
import { useEffect, useState } from 'react'

export default function Upload() {
    const status = {
        DEFAULT: {
            text: "Ready to receive files",
            color: "green.300"
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

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        //setCopiedText("Copied to clipboard!");
        setTimeout(() => {
            //setCopiedText(null);
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
                console.log(err.toJSON().status);
                switch (err.toJSON().status)
                {
                    case 413:
                        setStatusText(status.FILE_SIZE_EXCEEDED)
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
        //e.preventDefault();
        let fileObject = {}
        //this function is used click and drag events
        //they have their file data objects in different locations
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

    //miksi FormLabelilla oli mr>0??
    return (
        <>
        <Flex justifyContent={"center"} m="5" minW="50%" maxW="50%" >
            <FormControl onSubmit={(e) => e.preventDefault()} >
                <Center>
                    <FormLabel>
                        Status
                    </FormLabel>
                    <FormLabel color={statusText.color}>
                        {statusText.text}
                    </FormLabel>
                </Center>
                <Center>
                        {fileURI &&
                            <FormLabel
                                onClick={() => { copyToClipboard(fileURI) }}
                                _hover={{ color: "gray.500"}}
                                >
                                {fileURI}
                            </FormLabel>
                        }
                </Center>
                <FormLabel
                        textAlign={"center"}
                        htmlFor="fileInput"
                        _hover={{ color: "gray.500" }}
                        
                        border={"2px dashed"}
                        p="10em"
                        mr="0"
                        my="5"
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
                            uploadChange(e)
                            setDrag(false)
                        }}>
                    { loading ? <Spinner /> :  uploadText}
                    
                    </FormLabel>
                    <Input
                        id="fileInput"
                        onChange={uploadChange}
                        type="file"
                        hidden>
                    </Input>      
                <Button disabled={!buttonFlag} w="100%" onClick={uploadFile} mb="5">Upload</Button>
                {fileURI && <Preview url={fileURI}></Preview>}
                </FormControl>
            </Flex>
        </>
    )
}

export function Preview(props) {
    return (
        <>
            <Image
                
                src={props.url}
                alt="preview"
                _hover={{ color:"gray.500"}}
                border="2px dashed"
                p="2px"
                
                
                
                
                maxH={"50%"}
                margin={"auto"}
                
                p="2"/>
            
        </>
    )
}

//<Image src={props.url} alt="preview" style={{ "border": "1px dotted", "padding" : "0.5em"}}/>
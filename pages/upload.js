
import {
    Input,
    Flex,
    Center,
    FormControl,
    FormLabel,
    Button,
    Spinner
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
    };

    const defaultUploadText = "drag files here or click to upload";
    const [uploadText, setUploadText] = useState(defaultUploadText)
    const [statusText, setStatusText] = useState(status.DEFAULT)
    const [file, setFile] = useState(null)
    const [fileURI, setFileURI] = useState("")
    const [buttonFlag, setButtonFlag] = useState(false)
    const [loading, setLoading] = useState(false)

    const uploadFile = (e) => {
        console.log("uploading");
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
                    console.log(res);
                    setFileURI(res.data.fileURI)
                    setStatusText(status.FILE_UPLOAD_SUCCESS)
                }
                else { 
                    throw new Error("connection to upload API failed", { cause: res })
                }
                setLoading(false)
            })
            .catch((err) => {
                setStatusText(status.FILE_UPLOAD_FAILED)
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
            <Flex justifyContent={"center"} m="6" minW={"lg"} minH={"lg"} maxW={"lg"} maxH={"lg"}>
            <FormControl onSubmit={(e) => e.preventDefault()} mr="0">
                <Center>
                    <FormLabel>
                        Status
                    </FormLabel>
                    <FormLabel color={statusText.color}>
                        {statusText.text}
                    </FormLabel>
                </Center>
                <Center>
                    { fileURI && <FormLabel>{fileURI}</FormLabel> }

                </Center>
                <FormLabel
                        textAlign={"center"}
                        htmlFor="fileInput"
                        _hover={{ color: "gray.500" }}
                        _grabbed={{ color: "green.500"}}
                        border={"2px dashed"}
                        p="10em"
                        mr="0"
                        my="5"
                        onDragOver={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            
                        }}
                        onDragLeave={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                        }}
                        onDrop={(e) => {
                            uploadChange(e)
                        }}>
                    { loading ? <Spinner /> :  uploadText}
                    
                    </FormLabel>
                    <Input
                        id="fileInput"
                        onChange={uploadChange}
                        type="file"
                        hidden>
                    </Input>      
                <Button disabled={!buttonFlag} w="100%" onClick={ uploadFile }>Upload</Button>
                </FormControl>
        </Flex>
    )


}
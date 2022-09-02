
import {
    Input,
    Flex,
    Center,
    FormControl,
    FormLabel,
} from '@chakra-ui/react'

import { useState } from 'react'

export default function Upload() {
    const defaultUploadText = "drag files here or click to upload";
    const [uploadText, setUploadText] = useState(defaultUploadText)
    const [file, setFile] = useState(null)

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

        setFile(fileObject)
        setUploadText(fileObject.name.length > 52 ? 
            fileObject.name.slice(0, 48) + "..." : 
            fileObject.name)
    }

    return (
        <div>
            <Flex justifyContent={"center"} m="6">
                <Center>
                    <FormControl onSubmit={(e) => e.preventDefault()}>
                        <FormLabel 
                            
                            htmlFor="fileInput"
                            _hover={{ color: "blue.700" }}
                            border={"1px dashed"}
                            p="9em"
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
                            }
                            }>
                            {uploadText}
                        </FormLabel>
                        <Input
                            id="fileInput"
                            onChange={ uploadChange }
                            type="file"
                            hidden>
                        </Input>
                    </FormControl>
                </Center>
            </Flex>
        </div>
    )
}
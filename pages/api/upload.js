import { IncomingForm } from "formidable"
import fs from "fs"
import path from "path"

export const config = {
    api: {
      bodyParser: false,
        responseLimit: '300mb',
    }
};

const PUBLIC_FILE_LOCATION = process.env.PUBLIC_FILE_LOCATION
const MAXIMUM_FILE_SIZE_MB = 300

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default async function handler(req, res) {

    //simulating a delay for development to see if spinner etc works
    //await sleep(1000)

    const form = new IncomingForm({ maxFileSize: 1024 * 1024 * MAXIMUM_FILE_SIZE_MB})
    
    form.parse(req, (err, fields, file) => {
        if (err) {
            if (err.httpCode == 413)
                return res.status(413).json({ result: "file size exceeded" })
        }
        const fileInfo = {
            fileName: file.tiedosto.originalFilename,
            fileExtension: file.tiedosto.originalFilename.split(".").pop(),
            source: file.tiedosto.filepath,
        }
        const uploadDirectory = process.cwd() + process.env.FILE_UPLOAD_DIRECTORY
        const destination = path.join(uploadDirectory, fileInfo.fileName)

        if (!fs.existsSync(destination)) {
            fs.copyFileSync(fileInfo.source, destination)
            return res.status(200).json({
                fileURI: PUBLIC_FILE_LOCATION + fileInfo.fileName
            })
        }
        else {
            console.log(`successful upload @ ${PUBLIC_FILE_LOCATION + fileInfo.fileName}`);
            return res.status(409).json({
                fileURI: PUBLIC_FILE_LOCATION + fileInfo.fileName
            })
        }
    })
  }
  
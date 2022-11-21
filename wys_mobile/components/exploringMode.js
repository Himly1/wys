import { Text, Box } from "native-base"
import { useEffect, useState, } from "react"
import {audioExtrater} from '../filesManager'

function ExploringMode() {
    const [audioFiles, setAudioFiles] = useState([])

    useEffect(() => {
        const retreiveNames = async () => {
            const files = await audioExtrater.getTheListOfTheAudioFileNames()
            setAudioFiles(files)
        }

        retreiveNames()
    })

    return (
        <Box>
            <Text>{audioFiles.length}</Text>
        </Box>
    )
}

export default ExploringMode
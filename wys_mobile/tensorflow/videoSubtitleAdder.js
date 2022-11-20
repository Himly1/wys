import { extract } from './audioExtrater'
import { translate } from './stt'
import { audioExtrater, stt, finalVideo } from '../filesManager'
//The first is the name of the step
//The second is the function that handle the job of the step
//The thrid is the function which return the arguments of the function of the second 
//The four is the name of the argument which will be passed to the next progress
const progresses = [
    [
        "extract the audio from video",
        extract,
        ({ videoFileUri, videoFileName, theCallback }) => {
            return {
                videoUri: videoFileUri,
                progressCallback: theCallback,
                outputUri: audioExtrater.determineTheAudioFileUri(videoFileName)
            }
        },
        "audioFileUri"
    ],
    [
        "translate the audio to text",
        translate,
        ({ videoFileName, audioFileUri, theCallback }) => {
            return {
                audioFileUri: audioFileUri,
                progressCallback: theCallback,
                outputUriOfTheSRTFile: stt.determineTheSrtFileUri(videoFileName)
            }
        },
        "strFileUri"
    ],
    [
        "Add the subtitle to the video",
        addTheStrFileToTheVideo,
        ({ videoFileUri, videoFileName, theCallback, strFileUri }) => {
            return {
                videoFileUri: videoFileUri,
                progressCallback: theCallback,
                strFileUri: strFileUri,
                finalVideoUri: finalVideo.determineTheFinalVideoFileUri(videoFileName)
            }
        },
        "finalVideoUri"
    ]
]

function addTheStrFileToTheVideo({ videoFileUri, progressCallback, strFileUri, finalVideoUri }) {

}

export async function addSubtitle(fileUri, fileName, progressCallback) {
    const defaultArguments = {
        videoFileUri: fileUri,
        theCallback: undefined,
        videoFileName: fileName
    }

    for (const [name, jobHandler, jobArgumentsHandler, nameOfTheArgumentNameOfTheOutput] of progresses) {
        const callback = (now, error) => {
            progressCallback(name, now, error)
        }
        defaultArguments.theCallback = callback
        const argumentsOfTheJob = await jobArgumentsHandler(defaultArguments)
        const output = await jobHandler(argumentsOfTheJob)
        defaultArguments[nameOfTheArgumentNameOfTheOutput] = output
    }

    return defaultArguments.finalVideoUri
}
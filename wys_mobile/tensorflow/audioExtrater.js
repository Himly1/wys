import { FFmpegKit } from 'ffmpeg-kit-react-native'

export async function extract({ videoUri, progressCallback, outputUri }) {
    const command = `-y -i ${videoUri} -q:a 0 -map a ${outputUri} -loglevel debug`
    try {
       
        progressCallback(false, undefined)
        await FFmpegKit.execute(command)
        progressCallback(true, undefined)
    } catch (err) {
        console.error(`Error occurred while extracting the audio from the video ${videoUri}. The error is ${err}`)
        progressCallback(true, err.message)
        throw err
    }
}
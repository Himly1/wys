import * as fileSystem from 'expo-file-system'

function determineTheActualNameFromTheVideo(videoFileName, dirName, suffix) {
  const actualName = videoFileName.split('.')[0]
  return dirName + '/' +  actualName + '.' + suffix
}

const dirOfSaveAudio = fileSystem.documentDirectory + "audio"
export const audioExtrater = {
  determineTheAudioFileUri: (videoFileName) => {
    return determineTheActualNameFromTheVideo(videoFileName, dirOfSaveAudio, 'mov')
  }
}

const driOfSaveSrtFile = fileSystem.documentDirectory + 'srt'
export const stt = {
  determineTheSrtFileUri: (videoFileName) => {
    return determineTheActualNameFromTheVideo(videoFileName, driOfSaveSrtFile ,'.srt')
  }
}

export const dirOfSaveFinalVideo = fileSystem.documentDirectory + 'final'
export const finalVideo = {
  determineTheFinalVideoFileUri: (videoFileName) => {
    const suffix = videoFileName.split('.')[1]
    return determineTheActualNameFromTheVideo(videoFileName, dirOfSaveFinalVideo ,suffix)
  }
}

const makeDirs = [
  ["forSaveAudioFile", dirOfSaveAudio],
  ['forSaveSrtFile', driOfSaveSrtFile],
  ['forSaveFinalVideo', dirOfSaveFinalVideo]
]


export async function init() {
  for (const [desc, dirName] of makeDirs) {
    console.info(`Creating the dir ${dirName} for the purpose of ${desc}`)
    try {
      const dirMeta = await fileSystem.getInfoAsync(dirName)
      if(!dirMeta.isDirectory) {
        await fileSystem.makeDirectoryAsync(dirName, { intermediates: false })
      }
      console.info(`Created the dir ${dirName} for the purpose of ${desc} successfully!`)
    } catch (err) {
      console.error(`Faield to create the dir ${dirName} for the purpose ${desc}. The error is: ${err}`)
      throw err
    }
  }
}
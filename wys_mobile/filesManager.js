import * as fileSystem from 'expo-file-system'

function determineTheActualNameFromTheVideo(videoFileName, dirName, suffix) {
  const actualName = videoFileName.split('.')[0]
  return dirName + '/' + actualName + '.' + suffix
}

const dirOfSaveAudio = fileSystem.documentDirectory + "audio"
export const audioExtrater = {
  determineTheAudioFileUri: (videoFileName) => {
    return determineTheActualNameFromTheVideo(videoFileName, dirOfSaveAudio, 'mov')
  },

  getTheListOfTheAudioFileNames: async () => {
    try {
      return await fileSystem.readDirectoryAsync(dirOfSaveAudio)
    } catch (e) {
      console.error(`Error occrred while reading the dirctory ${dirOfSaveAudio}. The error is ${e}`)
      return []
    }
  }
}

const driOfSaveSrtFile = fileSystem.documentDirectory + 'srt'
export const stt = {
  determineTheSrtFileUri: (videoFileName) => {
    return determineTheActualNameFromTheVideo(videoFileName, driOfSaveSrtFile, '.srt')
  }
}

const dirOfSaveFinalVideo = fileSystem.documentDirectory + 'final'
export const finalVideo = {
  determineTheFinalVideoFileUri: (videoFileName) => {
    const suffix = videoFileName.split('.')[1]
    return determineTheActualNameFromTheVideo(videoFileName, dirOfSaveFinalVideo, suffix)
  }
}

const dirOfSaveModels = fileSystem.documentDirectory + 'models'
export const models = {
  moveTheFileToTheModelsFolder: async (fileUri) => {
    try {
      const name = fileUri.split('.')[1]
      const path = dirOfSaveModels + '/' + name
      await fileSystem.moveAsync({
        from: fileUri,
        to: path
      })

      return path
    } catch (e) {
      console.error(`Error occurred while moveing the model to the models folder. The error is ${e}`)
      throw e
    }
  }
}

const configFilePath = fileSystem.documentDirectory + 'config.json'
export const configFile = {
  writeToFile: async (json) => {
    try {
      await fileSystem.writeAsStringAsync(configFilePath, JSON.stringify(json), {
        encoding: 'utf8'
      })
    } catch (e) {
      console.error(`Error occurred while writing the json to the json. The error is ${e}`)
      throw `Unable to write  the json to the file ${configFilePath}`
    }
  },
  readFromFileAsJson: async () => {
    try {
      const rs = await fileSystem.readAsStringAsync(configFilePath, {
        encoding: 'utf8'
      })

      return JSON.parse(rs)
    } catch (e) {
      console.error(`Error occurred while reading the json file. The error is ${e}`)
      return {}
    }
  }

}

const dirMake = async (dirName, desc) => {
  const dirMeta = await fileSystem.getInfoAsync(dirName)
  if (!dirMeta.isDirectory) {
    await fileSystem.makeDirectoryAsync(dirName, { intermediates: true })
    console.info(`Created the dir ${dirName} for the purpose of ${desc} successfully!`)
  } else {
    console.info(`The dir ${dirName} for the porpose ${desc} already exists!`)
  }
}

const makeDirs = [
  ["forSaveAudioFile", dirOfSaveAudio, dirMake],
  ['forSaveSrtFile', driOfSaveSrtFile, dirMake],
  ['forSaveFinalVideo', dirOfSaveFinalVideo, dirMake],
  ['forSaveModels', dirOfSaveModels, dirMake]
]

const fileMaker = async (filePath, desc) => {
  const fileMeta = await fileSystem.getInfoAsync(filePath)
  if (!fileMeta.exists) {
    await fileSystem.writeAsStringAsync(filePath, JSON.stringify({}))
    console.info(`Created the file ${filePath} for the purpose ${desc} successfully!`)
  } else {
    console.info(`The file ${filePath} for the purpose ${desc} already exists!`)
  }
}

const makeFiles = [
  ['save json config', configFilePath, fileMaker]
]


export async function init() {
  const metas = []
  metas.push(...makeDirs)
  metas.push(...makeFiles)

  for (const [desc, uri, maker] of metas) {
    console.info(`Creating the dir or the file ${uri} for the purpose of ${desc}`)
    try {
      await maker(uri, desc)
    } catch (err) {
      console.error(`Faield to create the dir or the file ${uri} for the purpose ${desc}. The error is: ${err}`)
      throw err
    }
  }
}
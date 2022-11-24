import {models} from '../filesManager'
import {newModelWasUploaded} from '../configFile'

async function moveTheFileToTheModeslFolder(fileUri) {
    await models.moveTheFileToTheModelsFolder(fileUri)
}

async function saveTheModelToTheConfig(name, fileUriFromTheModelsFolder) {
    await newModelWasUploaded(name, fileUriFromTheModelsFolder)
}

export async function uploadNewModel(name, fileUri) {
    try {
        const uri = await moveTheFileToTheModeslFolder(fileUri)
        await saveTheModelToTheConfig(name, uri)
    }catch(e) {
        console.error(`Error occurred while uploading new model.. The Error is ${e}`)
        throw e
    }
}
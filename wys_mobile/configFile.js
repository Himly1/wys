import { configFile } from './filesManager'

let config = {
    defaultModel: undefined,
    models: {
    },
}

export async function getDefaultModel() {
    try {
        await readNewestConfig()
        return config.defaultModel
    } catch (e) {
        console.error(`Error occrred while get the default model. The error is ${e}`)
        throw e
    }
}

export async function changeDefaultModel(name) {
    try {
        await readNewestConfig()
        config.defaultModel = name
        await flush()
    } catch (e) {
        console.error(`Error occurred while change the default mode. The error is: ${e}`)
        throw e
    }
}

export async function getNameOfTheModels() {
    try {
        await readNewestConfig()
        return Object.keys(config.models === undefined ? [] : config.models )
    } catch (e) {
        console.error(`Failed to get the json config from the filesManager. The error is ${e}`)
        throw e
    }
}

export async function newModelWasUploaded(name, uri) {
    try {
        config.models[name] = uri
        await flush()
    } catch (e) {
        console.error(`Error occurred while write the json config to filesManager. The error is ${e} `)
        throw e
    }
}

async function readNewestConfig() {
    const json = await configFile.readFromFileAsJson()
    config = json
}

async function flush() {
    await configFile.writeToFile(config)
}
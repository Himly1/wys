import { Button, IconButton, Progress, Image, Heading, Alert, VStack, HStack, CloseIcon, Box, Text, View } from "native-base";
import { useReducer } from "react";
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import * as VideoThumbnails from 'expo-video-thumbnails';
import { translate } from '../international/language'
import { workingModePage } from '../international/keyRefs'
import { MaterialIcons } from '@expo/vector-icons';
import { addSubtitle } from '../tensorflow/videoSubtitleAdder'
import { AntDesign } from '@expo/vector-icons';


function WorkingMode() {
    const [states, setStates] = useReducer((p, n) => {
        return { ...p, ...n }
    }, {
        working: false,
        progressStep: undefined,
        progress: 0,
        previosWorkDone: undefined,
        filePath: '',
        fileName: '',
        thumbnailUri: '',
        error: undefined
    })

    async function takeTheUriOfTheFrameOfTheVideo(asset) {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                asset.uri,
                {
                    time: 1500,
                }
            );

            return uri
        } catch (e) {
            console.log(`Error occrred while take the frame of the video. ${e}`)
            setStates({
                error: e.message
            })
        }
    }

    async function confirmTheFileName(uri) {
        const chunks = uri.split('/')
        const name = chunks[chunks.length - 1]
        const theChunks = name.split('-')
        return theChunks[theChunks.length - 1]
    }

    async function pickVideo() {
        let rs = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: false,
            quality: 0.2,
            videoQuality: 1,
        }).catch((err => {
            console.log(`The error on launchImageLibraryAsync is ${err}`)
            setStates({
                error: err.message
            })
        }));

        console.log(rs)
        if (!rs.canceled) {
            const asset = rs.assets[0]
            const fileName = confirmTheFileName(asset.uri)['_z']

            const uri = await takeTheUriOfTheFrameOfTheVideo(asset)
            setStates({
                filePath: asset.uri,
                fileName: fileName,
                thumbnailUri: uri
            })
        }

    }

    function determineTheProgressWhichIsBoolean(progress) {
        return progress === true ? 100 : 55
    }

    function determineTheProgressStepName(stepOfTheName) {
        const metas = [
            ['extract the audio from video', workingModePage.labelOfStepOfExtractingAudio],
            ['translate the audio to text', workingModePage.labelOfStepOfTranslateToText],
            ['Add the subtitle to the video', workingModePage.labelOfStepOfAddingSubtitle]
        ]

        return metas.reduce((rs, [name, languageKey]) => {
            rs = name === stepOfTheName ? languageKey : rs
            return rs
        }, '')
    }

    async function startTransform() {
        setStates({
            working: true
        })
        const finalVideoUri = await addSubtitle(states.filePath, states.fileName, (stepOfTheName, progress, error) => {
            const typeOfTheProgress = typeof progress
            const realProgress = typeOfTheProgress === 'boolean' ? determineTheProgressWhichIsBoolean(progress) : parseInt(progress)
            setStates({
                progressStep: determineTheProgressStepName(stepOfTheName),
                progress: realProgress,
                error: error === undefined || error === null ? undefined : error
            })
        }).then(rs => {
            setStates({
                progress: 100
            })
        })

        setTimeout(() => {
            setStates({
                working: false,
                progressStep: undefined,
                progress: 0,
                previosWorkDone: finalVideoUri,
                filePath: '',
                fileName: '',
                thumbnailUri: '',
                error: undefined
            })
        }, 1000);
    }

    function renderTheProgressbar() {
        return (
            <Box>
                <Text style={{ fontSize: 16 }} color={'white'} alignSelf={'center'}>{translate(workingModePage.labelOfProgressName)}: {translate(states.progressStep)}</Text>
                <Progress alignSelf={'center'} width={'80%'} colorScheme={'emerald'} value={states.progress}></Progress>
            </Box>
        )
    }

    function showWhenTheFileUploaded() {
        return (
            <View>
                <Text color={'white'} style={{ alignSelf: 'center', fontSize: 16 }}>{translate(workingModePage.labelOfFileName)}: {states.fileName}</Text>
                <Image alignSelf={'center'} style={{ marginTop: '2%' }} source={{ uri: states.thumbnailUri, width: 250, height: 200, alt: 'uploaded', _alt: 'uploaded' }} />
                {!states.working && <Button onPress={startTransform} leftIcon={<MaterialIcons name="transform" size={24} color="black" />} alignSelf={'center'} style={{ marginTop: '2%' }}>{translate(workingModePage.labelOfTransformButton)}</Button>}
                {states.working && renderTheProgressbar()}
            </View>
        )
    }

    function renderErrorMessage() {
        return <Box alignSelf='center'>
            <Alert maxW="300" status="error">
                <VStack space={1} flexShrink={1} w="100%">
                    <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                        <HStack flexShrink={1} space={2} alignItems="center">
                            <Alert.Icon />
                            <Text fontSize="md" fontWeight="medium" _dark={{
                                color: "coolGray.800"
                            }}>
                                {translate(workingModePage.labelOfErrorMessage)}
                            </Text>
                        </HStack>
                        <IconButton variant="unstyled" _focus={{
                            borderWidth: 0
                        }} icon={<CloseIcon size="3" />} _icon={{
                            color: "coolGray.600"
                        }} onPress={() => setStates({
                            error: undefined
                        })} />
                    </HStack>
                    <Box pl="6" _dark={{
                        _text: {
                            color: "coolGray.600"
                        }
                    }}>
                        {states.error}
                    </Box>
                </VStack>
            </Alert>
        </Box>
    }

    function renderMainPage() {
        return (
            <Box>
                <Heading color={'white'} size={'sm'} style={{ alignSelf: 'center' }}>{translate(states.working ? workingModePage.labelOfHeadingOnWorking : workingModePage.labelOfHeading)}</Heading>
                <Button disabled={states.working} size={'sm'} onPress={pickVideo} style={{ alignSelf: 'center' }} leftIcon={states.working ? <AntDesign name="close" size={24} color="black" /> : <Feather name="upload" size={24} color="black" />}></Button>
                {states.fileName !== '' && showWhenTheFileUploaded()}
            </Box>
        )
    }

    return (
        <Box>
            {states.error !== undefined ? renderErrorMessage() : renderMainPage()}
        </Box>
    )
}

export default WorkingMode
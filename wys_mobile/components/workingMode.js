import { Button, IconButton, Image, Heading, Alert, VStack, HStack, CloseIcon, Box, Text } from "native-base";
import { useReducer } from "react";
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import * as VideoThumbnails from 'expo-video-thumbnails';
import {translate} from '../international/language'
import {workingModePage} from '../international/keyRefs'
import { MaterialIcons } from '@expo/vector-icons';

function WorkingMode() {
    const [states, setStates] = useReducer((p, n) => {
        return { ...p, ...n }
    }, {
        working: false,
        progress: 0,
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
        console.log(`The length of the chunks is ${chunks.length}`)
        return chunks[chunks.length - 1]
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
            console.log(`The fileName is ${JSON.stringify(fileName)}`)
            const uri = await takeTheUriOfTheFrameOfTheVideo(asset)
            setStates({
                filePath: asset.uri,
                fileName: fileName,
                thumbnailUri: uri
            })
        }

    }

    function startTransform() {
        
    }

    function showWhenTheFileUploaded() {
        const items = [
            <Text color={'white'} style={{ alignSelf: 'center'}}>{translate(workingModePage.labelOfFileName)}: {states.fileName}</Text>,
            <Image alignSelf={'center'} style={{ marginTop: '2%' }} source={{ uri: states.thumbnailUri, width: 250, height: 200, alt: 'uploaded', _alt: 'uploaded' }} />,
            <Button onPress={startTransform} leftIcon={<MaterialIcons name="transform" size={24} color="black" />} alignSelf={'center'} style={{marginTop: '2%'}}>{translate(workingModePage.labelOfTransformButton)}</Button>
        ]

        return items
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
                <Heading color={'white'} size={'sm'} style={{ alignSelf: 'center' }}>{translate(workingModePage.labelOfHeading)}</Heading>
                <Button size={'sm'} onPress={pickVideo} style={{ alignSelf: 'center' }} leftIcon={<Feather name="upload" size={24} color="black" />}></Button>
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
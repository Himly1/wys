import {Box, Image} from 'native-base'
function Logo() {
    return (
        <Box>
            <Image style={{marginTop: '7%',alignSelf: 'center'} } source={require('../assets/logo.png')}/>
        </Box>
    )
}

export default Logo
import {View, Image, Text, StyleSheet, ImageBackground} from 'react-native'
const styles = StyleSheet.create({
    tinyLogo: {
        width: 50,
        height: 50
    }
})
function Logo() {
    return (
        <View style={{height: '20%', marginTop: '10%',alignSelf: 'center'} }>
            <Image source={require('../assets/logo.png')}/>
        </View>
    )
}

export default Logo
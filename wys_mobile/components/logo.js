import {View, Image, Text, StyleSheet, ImageBackground} from 'react-native'
const styles = StyleSheet.create({
    tinyLogo: {
        width: 50,
        height: 50
    }
})
function Logo() {
    return (
        <View style={{paddingTop: '20%'}}>
            <Image source={require('../assets/logo.png')} style={{
                height: '55%',
                width: '40%',
                alignSelf: 'center'
            }}/>
        </View>
    )
}

export default Logo
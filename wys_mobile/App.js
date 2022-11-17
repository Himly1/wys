import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/home';
import {NativeBaseProvider, Box} from 'native-base'
import {init} from './international/language'

export default function App() {
  return (
    <NativeBaseProvider>
      <Box style={styles.container}>
        <Home/>
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: "100%",
    width: "100%"
  },
});

init('cn')
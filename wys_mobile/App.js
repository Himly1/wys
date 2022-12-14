import { StyleSheet, Platform, NativeModules } from 'react-native';
import Home from './components/home';
import { NativeBaseProvider, Box } from 'native-base'
import { findOutTheSuitableLanguage, init } from './international/language'
import {init as fileManagerInit} from './filesManager'

export default function App() {
  return (
    <NativeBaseProvider>
      <Box style={styles.container}>
        <Home />
      </Box>
    </NativeBaseProvider>
  );
}

function confirmTheOsLanguage() {
  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
      : NativeModules.I18nManager.localeIdentifier;

  return findOutTheSuitableLanguage(deviceLanguage)
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5b86e5',
    height: "100%",
    width: "100%"
  },
});

const lng = confirmTheOsLanguage()
init(lng)
fileManagerInit()
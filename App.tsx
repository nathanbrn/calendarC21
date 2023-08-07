import { StatusBar } from 'expo-status-bar';

import { NativeBaseProvider } from 'native-base';

import 'react-native-gesture-handler';
import { InfoProvider } from './src/context';
import { StackRouter } from './src/screens/Register';

export default function App() {
  return (
    <InfoProvider>
      <NativeBaseProvider>
        <StackRouter />
        <StatusBar style='light' />
      </NativeBaseProvider>
    </InfoProvider>
  );
}

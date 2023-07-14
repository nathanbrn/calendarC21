import { StatusBar } from 'expo-status-bar';

import 'react-native-gesture-handler';
import { StackRouter } from './src/screens/Register';

export default function App() {
  return (
    <>
      <StackRouter />
      <StatusBar style='light' />
    </>
  );
}

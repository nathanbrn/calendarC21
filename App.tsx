import { StatusBar } from 'expo-status-bar';

import 'react-native-gesture-handler';
import { InfoProvider } from './src/context';
import { StackRouter } from './src/screens/Register';

export default function App() {
  return (
    <InfoProvider>
      <StackRouter />
      <StatusBar style='light' />
    </InfoProvider>
  );
}

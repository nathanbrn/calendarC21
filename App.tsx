import { StatusBar } from 'expo-status-bar';
import Routes from './src';

import 'react-native-gesture-handler';

export default function App() {
  return (
    <>
      <Routes />
      <StatusBar style='light' />
    </>
  );
}

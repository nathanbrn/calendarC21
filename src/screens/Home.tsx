import { View } from 'react-native';
import { CalendarComponent, Main } from '../components';

export default function Home() {
  return (
    <Main>
      <View className='mt-7'>
        <CalendarComponent />
      </View>
    </Main>
  );
}

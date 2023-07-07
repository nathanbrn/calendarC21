import { Image, View } from 'react-native';
import { CalendarComponent, Logo, Main } from '../components';

export default function Home() {
  return (
    <Main>
      <View className='mt-7'>
        <CalendarComponent />
      </View>
    </Main>
  );
}

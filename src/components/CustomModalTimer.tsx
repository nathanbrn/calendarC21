import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { Button } from './Button';

interface CustomModalTimerProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentDay?: string;
  currentMount?: string;
  currentYear?: string;
  currentWeek?: string;
}

export function CustomModalTimer({ setShowModal, currentDay, currentMount, currentYear, currentWeek }: CustomModalTimerProps) {

  return (
    <>
      <View className='items-center justify-center border-4 border-purple-300 rounded-full h-80 w-80 mx-auto mt-2'>
        <View className='bg-white border-2 border-purple-700 p-4 items-center justify-center h-60 w-60 rounded-full'>
          <Text className='text-purple-500 font-bold text-lg'>
            {currentWeek}
          </Text>
          <Text className='text-purple-600 font-bold text-8xl'>
            {currentDay}
          </Text>
          <Text className='text-purple-500 font-bold text-2xl'>
            {currentMount}
          </Text>
          <Text className='text-purple-500 font-bold text-lg'>
            {currentYear}
          </Text>
        </View>
        <Button
          description='Mais informações'
          icon={<Feather name='chevron-up' size={32} color='white' />}
          onClick={() => setShowModal(true)}
        />
      </View>
    </>
  );
}

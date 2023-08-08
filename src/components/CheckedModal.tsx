import { Feather } from '@expo/vector-icons';
import { useContext } from 'react';
import { Text, View } from 'react-native';
import { InfoContext } from '../context/infoContext';
import { Button } from './Button';

interface CheckedModalProps {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CheckedModal({ checked, setChecked }: CheckedModalProps) {
  const currentDay = new Date().toISOString().slice(0, 10);
  const { markedDates } = useContext(InfoContext);

  if (markedDates[currentDay] && markedDates[currentDay]['periods'][0]['color'] === 'red') {
    return (
      <View className='w-full mt-10 border rounded-lg border-zinc-500 p-3 bg-white'>
        <View className='items-center justify-center mb-2'>
          <Feather name='alert-circle' size={24} color='red' />
        </View>
        <Text className='text-lg font-semibold'>Você está em periodo de pausa do remédio!</Text>
      </View>
    );
  }

  if (!checked) {
    return (
      <View className='w-full h-24 mt-10 border rounded-lg border-zinc-500 p-3 bg-white'>
        <Text className='text-lg font-semibold'>Já tomou seu anticoncepcional hoje?</Text>
        <View className='flex-row'>
          <Button
            type='terciary'
            icon={ <Feather name='check' size={24} color='white' /> }
            onClick={() => setChecked(true)}
          />
        </View>
      </View>
    );
  }

  return null;
}

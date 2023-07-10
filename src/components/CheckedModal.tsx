import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { Button } from './Button';

interface CheckedModalProps {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CheckedModal({ checked, setChecked }: CheckedModalProps) {
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

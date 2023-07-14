import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Switch, Text, View } from 'react-native';
import { Button, Main } from '../components';

export default function Settings() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <Main>
      <View className='mb-2 mt-6 items-center justify-center'>
        <Text className='text-xl font-bold text-white'>Tema</Text>
      </View>
      <View className='flex-row items-center justify-center gap-1'>
        <Button
          type='primary'
          icon={ <Ionicons name='ios-sunny-sharp' size={24} color='#FFFF00' /> }
          onClick={() => setIsEnabled(false)}
        />
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor='#3e3e3e'
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Button
          type='primary'
          icon={ <Ionicons name='ios-moon' size={24} color='#FFD700' /> }
          onClick={() => setIsEnabled(true)}
        />
      </View>
    </Main>
  );
}

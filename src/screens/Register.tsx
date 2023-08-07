/* eslint-disable @typescript-eslint/no-explicit-any */
import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Select } from 'native-base';
import { useContext, useLayoutEffect, useState } from 'react';
import { Modal, Text, TextInput, View } from 'react-native';
import Routes from '..';
import { Button, Main } from '../components';
import { InfoContext } from '../context/infoContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Initial({ navigation }: any) {

  const { name, date, hour } = useContext(InfoContext);

  useLayoutEffect(() => {
    if (name && date && hour) {
      navigation.navigate('home');
    }
  }, [name, date, hour, navigation]);

  return (
    <Main>
      <View className='flex-1 items-center justify-center'>
        <Text className='text-4xl text-gray-200 font-bold mb-4'>Bem vindo!</Text>
        {(!name && !date) && (
          <Button
            type='confirm'
            description='Começar'
            onClick={() => navigation.navigate('register')}
          />
        )}
      </View>
    </Main>
  );
}

function Register({ navigation }: any) {

  const { name, date, hour, setName, setDate, setHour } = useContext(InfoContext);

  const [primaryModalVisible, setPrimaryModalVisible] = useState(true);
  const [secondaryModalVisible, setSecondaryModalVisible] = useState(false);
  const [tertiaryModalVisible, setTertiaryModalVisible] = useState(false);

  function formatDate(date: string) {
    const dateRegex = /^(\d{2})(\d{2})(\d{4})$/;
    const dateFormatted = date.replace(dateRegex, '$1/$2/$3');

    return dateFormatted;
  }

  function handleDateChange(date: string) {
    const formattedDate = formatDate(date);
    setDate(formattedDate);
  }

  function handleTimeChange(timeString: string) {
    const formattedTime = timeString;
    setHour(formattedTime);
  }

  return (
    <Main>
      <Modal
        transparent
        visible={primaryModalVisible}
        animationType='slide'
      >
        <View className='flex-1 items-center justify-center'>
          <Text className='text-2xl text-gray-200 font-bold '>Informe seu nome</Text>
          <TextInput
            className='bg-gray-300 w-2/4 h-12 rounded-lg mt-4 px-4'
            placeholder='Insira seu nome...'
            value={name}
            onChangeText={setName}
          />
          <View className='w-2/4 justify-start'>
            <Text className='text-sm text-white text-start'>
              * Informe apenas o primeiro, ou no máximo até o segundo nome, ou sobrenome.
            </Text>
          </View>
          <Button
            type='confirm'
            description='Confirmar'
            onClick={() => {
              setPrimaryModalVisible(false);
              setSecondaryModalVisible(true);
            }}
          />
        </View>
      </Modal>

      <Modal
        transparent
        visible={secondaryModalVisible}
        animationType='slide'
      >
        <View className='flex-1 items-center justify-center'>
          <Text className='text-2xl text-gray-200 font-bold '>Informe a data que iniciou</Text>
          <View className='flex-row items-center gap-1 mt-4 mb-2 p-2 mr-6'>
            <Feather name='calendar' size={32} color='rgb(209,213,219)' />
            <TextInput
              className='bg-gray-300 w-34 h-12 rounded-lg px-4 text-gray-600 font-bold text-lg'
              placeholder='dd/mm/aaaa'
              value={date}
              onChangeText={handleDateChange}
              keyboardType='numeric'
            />
          </View>
          <Button
            type='confirm'
            description='Confirmar'
            onClick={() => {
              setSecondaryModalVisible(false);
              setTertiaryModalVisible(true);
            }}
          />
          <View className='absolute bottom-8'>
            <Button
              type='primary'
              description='Vou começar hoje'
              onClick={() => {
                setDate(formatDate(new Date().toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })));
                setSecondaryModalVisible(false);
                setTertiaryModalVisible(true);
              }}
            />
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        visible={tertiaryModalVisible}
        animationType='slide'
      >
        <View className='flex-1 items-center justify-center'>
          <Text className='text-2xl text-gray-200 font-bold '>Informe seu nome</Text>
          <View className='flex-row items-center gap-1 mt-4 mb-2 p-2 mr-6'>
            <Feather name='clock' size={32} color='rgb(209,213,219)' />
            <Select
              selectedValue={hour}
              accessibilityLabel='Selecione o horário'
              placeholder='Selecione o horário'
              _selectedItem={{
                bg: 'cyan.600',
                endIcon: <Feather name='check-circle' size={24} color='rgb(209,213,219)' />,
              }}
              mt={1}
              onValueChange={itemValue => handleTimeChange(itemValue)}
            >
              <Select.Item label='0h' value='T10:00:00' />
              <Select.Item label='1h' value='T01:00:00' />
              <Select.Item label='2h' value='T02:00:00' />
              <Select.Item label='3h' value='T03:00:00' />
              <Select.Item label='4h' value='T04:00:00' />
              <Select.Item label='5h' value='T05:00:00' />
              <Select.Item label='6h' value='T06:00:00' />
              <Select.Item label='7h' value='T07:00:00' />
              <Select.Item label='8h' value='T08:00:00' />
              <Select.Item label='9h' value='T09:00:00' />
              <Select.Item label='10h' value='T10:00:00' />
              <Select.Item label='11h' value='T11:00:00' />
              <Select.Item label='12h' value='T12:00:00' />
              <Select.Item label='13h' value='T13:00:00' />
              <Select.Item label='14h' value='T14:00:00' />
              <Select.Item label='15h' value='T15:00:00' />
              <Select.Item label='16h' value='T16:00:00' />
              <Select.Item label='17h' value='T17:00:00' />
              <Select.Item label='18h' value='T18:00:00' />
              <Select.Item label='19h' value='T19:00:00' />
              <Select.Item label='20h' value='T20:00:00' />
              <Select.Item label='21h' value='T21:00:00' />
              <Select.Item label='22h' value='T22:00:00' />
              <Select.Item label='23h' value='T23:00:00' />
            </Select>
          </View>
        </View>
      </Modal>
    </Main>
  );
}

const Stack = createNativeStackNavigator();

export function StackRouter() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="initial"
          component={Initial}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home"
          component={Routes}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

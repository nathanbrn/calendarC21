/* eslint-disable @typescript-eslint/no-explicit-any */
import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { Modal, Text, TextInput, View } from 'react-native';
import Routes from '..';
import { Button, Main } from '../components';
import { InfoContext } from '../context/infoContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Initial({ navigation }: any) {
  return (
    <Main>
      <View className='flex-1 items-center justify-center'>
        <Text className='text-4xl text-gray-200 font-bold mb-4'>Bem vindo!</Text>
        <Button
          type='confirm'
          description='Começar'
          onClick={() => navigation.navigate('register')}
        />
      </View>
    </Main>
  );
}

function Register({ navigation }: any) {

  const { name, date, setName, setDate } = useContext(InfoContext);

  const [primaryModalVisible, setPrimaryModalVisible] = useState(true);
  const [secondaryModalVisible, setSecondaryModalVisible] = useState(false);

  function formatDate(date: string) {
    const dateRegex = /^(\d{2})(\d{2})(\d{4})$/;
    const dateFormatted = date.replace(dateRegex, '$1/$2/$3');

    return dateFormatted;
  }

  function handleDateChange(date: string) {
    const formattedDate = formatDate(date);
    setDate(formattedDate);
  }

  return (
    <Main>
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
              navigation.navigate('home');
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
                navigation.navigate('home');
              }}
            />
          </View>
        </View>
      </Modal>

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

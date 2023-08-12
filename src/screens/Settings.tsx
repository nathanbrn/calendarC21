import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { Alert, Modal, Switch, Text, View } from 'react-native';
import { Button, Main } from '../components';
import { InfoContext } from '../context/infoContext';
import { handleDeleteData } from '../utils/handleDeleteData';

export default function Settings() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isModalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const { setInfoChecked, setName, setDate, setHour } = useContext(InfoContext);

  function handleDelete() {
    isModalVisible ? setModalVisible(false) : setModalVisible(true);
  }

  function handleDeleteDataSettings() {
    handleDelete();

    setInfoChecked({});
    setName('');
    setDate('');
    setHour('');

    handleDeleteData();

    createAlert();

    navigation.navigate('initial');
  }

  function createAlert() {
    Alert.alert('Dados excluídos com sucesso!', 'Todos os dados salvos na memória do celular foram apagados com sucesso...', [
      {text: 'OK'},
    ]);
  }

  return (
    <Main>
      <View className='mb-2 mt-6 items-center justify-center'>
        <Text className='text-white underline'>Configuração não aplicada</Text>
        <Text className='line-through text-xl font-bold text-white'>Tema</Text>
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

      <View className='mt-12'>
        <Button
          type='confirm'
          description='Apagar dados'
          onClick={handleDelete}
        />
      </View>
      <Modal
        visible={isModalVisible}
        animationType='slide'
        transparent
      >
        <View className='h-52 w-full absolute bottom-0 bg-white rounded-t-lg'>
          <View className='flex-1 items-center justify-center px-4'>
            <Text className='text-xl font-bold text-white'>Apagar dados</Text>
            <Text className='text-Purple text-xl text-center font-bold'>Tem certeza que deseja apagar todos os dados?</Text>
            <View className='flex-row items-center justify-center w-52'>
              <Button
                type='confirm'
                description='Sim'
                onClick={handleDeleteDataSettings}
              />
              <Button
                type='confirm'
                description='Não'
                onClick={handleDelete}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Main>
  );
}

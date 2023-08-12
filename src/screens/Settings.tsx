import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { Alert, Modal, Text, View } from 'react-native';
import { Button, Main } from '../components';
import { InfoContext } from '../context/infoContext';
import { handleDeleteData } from '../utils/handleDeleteData';

export default function Settings() {
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
      <View className='mt-12'>
        <Text className='text-lg font-bold text-white'>
          Deseja apagar todos os dados?
        </Text>
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

import { Feather } from '@expo/vector-icons';
import { Modal, Text, View } from 'react-native';
import { Button } from './Button';
import { CalendarComponent } from './Calendar';

interface ModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

export function ModalComponent({ showModal, setShowModal }: ModalProps) {
  return (
    <Modal
      visible={showModal}
      animationType='slide'
      transparent={true}
    >
      <View
        className='w-full h-full border border-purple-300 rounded-t-lg absolute bottom-0 bg-white'
        style={{
          elevation: 10
        }}
      >
        <Button
          type='secondary'
          description='Menos informações'
          icon={<Feather name='chevron-down' size={32} color='gray' />}
          onClick={() => {
            setShowModal(false);
          }}
        />
        <View className='mt-2 mb-10'>
          <CalendarComponent />
        </View>
        <View className='items-end justify-center my-2 bg-Purple w-96 h-10 border rounded-r-lg p-2'>
          <Text className='text-white font-bold text-md text-center mx-4'>Dia atual</Text>
        </View>
        <View className='my-2 items-end justify-center bg-Red w-80 h-10 border rounded-r-lg p-2'>
          <Text className='text-white font-bold text-md text-center mx-4'>Periodo de pausa</Text>
        </View>
        <View className='my-2 items-end justify-center bg-green-500 w-64 h-10 border rounded-r-lg p-2'>
          <Text className='text-white font-bold text-md text-center mx-4'>Dias consumidos</Text>
        </View>
        <View className='my-2 items-end justify-center bg-orange-500 w-52 h-10 border rounded-r-lg p-2'>
          <Text className='text-white font-bold text-md text-center mx-4'>Periodo para consumo</Text>
        </View>
      </View>
    </Modal>
  );
}

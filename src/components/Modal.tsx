import { Feather } from '@expo/vector-icons';
import { Modal, View, Text } from 'react-native';
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
        className='w-full h-full justify-between border border-purple-300 rounded-t-lg absolute bottom-0 bg-white'
        style={{
          elevation: 10
        }}
      >
        <Button
          icon={<Feather name='chevron-down' size={32} color='gray' />}
          onClick={() => {
            setShowModal(false);
          }}
        />
        <View className='w-full items-center'>
          <Text className='text-lg font-bold text-Purple'>Mais informações</Text>
        </View>
        <View>
          <CalendarComponent />
        </View>
      </View>
    </Modal>
  );
}

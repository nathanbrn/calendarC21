import { Feather } from '@expo/vector-icons';
import { Dimensions, Modal, StyleSheet, Text, View } from 'react-native';
import { Button } from './Button';
import { CalendarComponent } from './Calendar';

interface ModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

export function ModalComponent({ showModal, setShowModal }: ModalProps) {
  const heightWindow = Dimensions.get('window').height;
  const heightScreen = Dimensions.get('screen').height;
  let styles;
  if (heightWindow > heightScreen) {
    styles = StyleSheet.create({
      container: {
        height: heightWindow + 6,
      },
      containerSubtitle: {
        marginBottom: 20,
        bottom: 20,
      }
    });
  }

  return (
    <Modal
      visible={showModal}
      animationType='slide'
      transparent
    >
      <View
        className='w-full h-full border border-purple-300 rounded-t-lg absolute bottom-0 bg-white'
        style={styles?.container}
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
        <View
          style={styles?.containerSubtitle}
        >
          <View className='items-end justify-center mb-2 bg-Purple w-96 h-10 border rounded-r-lg p-2'>
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
      </View>
    </Modal>
  );
}

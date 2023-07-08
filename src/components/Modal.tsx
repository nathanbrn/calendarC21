import { Modal, View } from 'react-native';
import { Button } from './Button';
import { CalendarComponent } from './Calendar';

interface ModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  setVisibleButton: (visibleButton: boolean) => void;
}

export function ModalComponent({ showModal, setShowModal, setVisibleButton }: ModalProps) {
  return (
    <Modal
      visible={showModal}
      animationType='slide'
      transparent={true}
    >
      <View
        className='w-full justify-center border border-Purple rounded-t-lg absolute bottom-0'
        style={{
          // backgroundColor: 'rgba(0, 0, 0, 0.7)',
          elevation: 10
        }}
      >
        <CalendarComponent />
        <Button
          description='Close'
          onClick={() => {
            setShowModal(false);
            setVisibleButton(true);
          }}
        />
      </View>
    </Modal>
  );
}

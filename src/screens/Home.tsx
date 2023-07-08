import { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Main } from '../components';
import { ModalComponent } from '../components/Modal';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [visibleButton, setVisibleButton] = useState(true);
  const currentDay = useRef<string>();

  useEffect(() => {
    currentDay.current = new Date().toLocaleDateString('pt-BR');
  }, []);

  return (
    <Main>
      <View className='mt-7'>
        <View className='items-center justify-center border-4 rounded-full h-80 mx-5 mt-2'
        >

          <View className='bg-Black bg-opacity-30 p-4 rounded-lg'>
            <Text className='text-white '>{currentDay.current}</Text>
          </View>

          <Button onClick={() =>{
            setShowModal(true);
            setVisibleButton(false);
          }} description='Open Modal'/>
        </View>

        <ModalComponent setVisibleButton={setVisibleButton} setShowModal={setShowModal} showModal={showModal} />
      </View>
    </Main>
  );
}

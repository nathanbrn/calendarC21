import { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { CustomModalTimer, Main, ModalComponent } from '../components';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const currentDay = useRef<string>();
  const currentMount = useRef<string>();
  const currentYear = useRef<string>();
  const currentWeek = useRef<string>();

  useEffect(() => {
    currentDay.current = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
    });
    currentMount.current = new Date().toLocaleDateString('pt-BR', {
      month: 'long',
    }).charAt(0).toUpperCase() + new Date().toLocaleDateString('pt-BR', {
      month: 'long',
    }).slice(1);
    currentYear.current = new Date().toLocaleDateString('pt-BR', {
      year: 'numeric',
    });
    currentWeek.current = new Date().toLocaleDateString('pt-BR', {
      weekday: 'long'
    }).split(',')[0];

    setLoading(false);
  }, [loading]);

  return (
    <Main>
      {currentWeek.current ? (
        <View className='mt-7'>
          <CustomModalTimer
            currentDay={currentDay.current}
            currentMount={currentMount.current}
            currentYear={currentYear.current}
            currentWeek={currentWeek.current}
            setShowModal={setShowModal}
          />
          <ModalComponent setShowModal={setShowModal} showModal={showModal} />
        </View>
      ) : (
        <View className='flex-1 items-center justify-center'>
          <Text className='text-white text-2xl'>Carregando...</Text>
        </View>
      )}
    </Main>
  );
}

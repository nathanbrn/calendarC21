import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { CheckedModal, CustomModalTimer, Main, ModalComponent } from '../components';
import { InfoContext } from '../context/infoContext';
import { formatDate } from '../utils/formatDate';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const currentDay = useRef<string>();
  const currentMount = useRef<string>();
  const currentYear = useRef<string>();
  const currentWeek = useRef<string>();
  const [checked, setChecked ] = useState(false);
  const [currentDate, setCurrentDate] = useState(formatDate(new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })));
  const [dataChecked, setDataChecked] = useState<Record<string, any>>();

  const { name, setInfoChecked } = useContext(InfoContext);

  const handleInfoChecked = useCallback(() => {
    const date = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    return {
      [formatDate(date)]: {
        periods: [
          { startingDay: false, endingDay: false, color: 'green' },
        ]
      },
    };
  }, [formatDate]);

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

    if (name) {
      setLoading(false);
    }

    if (checked) {
      setInfoChecked(handleInfoChecked());
      setDataChecked({ ...dataChecked, ...handleInfoChecked()});
    }

  }, [name, loading, checked, handleInfoChecked]);

  useEffect(() => {
    const timer = setInterval(() => {
      const today = formatDate(new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }));
      if (today !== currentDate) {
        setChecked(false);
        setCurrentDate(today);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [currentDate]);

  return (
    <Main>
      {currentWeek.current ? (
        <View className='mt-7'>
          <View className='w-full my-4'>
            <Text className='text-2xl text-white'>Olá,</Text>
            <Text className='text-3xl text-white ml-4'>{name}</Text>
          </View>
          <CustomModalTimer
            checked={checked}
            currentDay={currentDay.current}
            currentMount={currentMount.current}
            currentYear={currentYear.current}
            currentWeek={currentWeek.current}
            setShowModal={setShowModal}
          />

          <CheckedModal
            checked={checked}
            setChecked={setChecked}
          />

          <ModalComponent dataChecked={dataChecked} setShowModal={setShowModal} showModal={showModal} />
        </View>
      ) : (
        <View className='flex-1 items-center justify-center'>
          <Text className='text-white text-2xl'>Carregando...</Text>
        </View>
      )}
    </Main>
  );
}

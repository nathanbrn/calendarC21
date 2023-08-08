import {
  getExpoPushTokenAsync,
  requestPermissionsAsync,
  scheduleNotificationAsync,
  setNotificationHandler,
} from 'expo-notifications';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { CheckedModal, CustomModalTimer, Main, ModalComponent } from '../components';
import { InfoContext } from '../context/infoContext';
import { formatDate } from '../utils/formatDate';
import { MarkedDate } from '../@types/calendar.props';

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

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
  const [dataChecked, setDataChecked] = useState<Record<string, MarkedDate>>();
  const [notificationId, setNotificationId] = useState<string | undefined>(undefined);

  const { name, hour, infoChecked, setInfoChecked } = useContext(InfoContext);

  useEffect(() => {
    const auxCurrent = new Date().toISOString().slice(0, 10);
    const infoCheckedKeys = Object.keys(infoChecked);
    const check = infoCheckedKeys.includes(auxCurrent);

    if (check) {
      setChecked(true);
    }
  }, [infoChecked]);

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
      setInfoChecked((prevInfoChecked: MarkedDate) => ({ ...prevInfoChecked, ...handleInfoChecked() }));
      setDataChecked({ ...dataChecked, ...handleInfoChecked() });
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

  useEffect(() => {
    (async () => {
      try {
        const { status } = await requestPermissionsAsync();
        const token = (await getExpoPushTokenAsync()).data;

        setNotificationId(token);

        if (status !== 'granted') {
          alert('Precisamos de permissão para enviar notificações.');
          return;
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  async function schedulePushNotification() {
    await scheduleNotificationAsync({
      content: {
        title: 'Já tomou seu remédio hoje? 🤔',
        body: 'Não esqueça de registrar, caso não tenha tomado, aproveite a oportunidade de não gerar uma vida no momento 😇',
      },
      trigger: {
        channelId: notificationId,
        date: new Date(`${currentDate}${hour}`),
      },
    });
  }

  useEffect(() => {
    schedulePushNotification();
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

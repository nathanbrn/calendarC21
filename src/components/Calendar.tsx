import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Quar.', 'Quin.', 'Sex.', 'Sab.'],
  today: 'Hoje'
};

LocaleConfig.defaultLocale = 'pt-br';

export function CalendarComponent() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState<string>('');
  const [selected, setSelected] = useState('');

  const [markedDates, setMarkedDates] = useState({
    [currentDate?.toString()] : { selected: true, marked: true, selectedColor: 'purple' },
    [selected]: {selected: true, disableTouchEvent: true, selectedColor: 'orange', dotColor: 'purple'},


    '2023-07-15': {
      periods: [
        {startingDay: true, endingDay: false, color: 'green'},
        {startingDay: true, endingDay: false, color: 'orange'}
      ]
    },
    '2023-07-16': {
      periods: [
        {color: 'green'},
        {color: 'orange'}
      ]
    },
    '2023-07-17': {
      periods: [
        {color: 'green'},
        {color: 'orange'}
      ]
    },
    '2023-07-18': {
      periods: [
        {color: 'green'},
        {color: 'orange'}
      ]
    },
    '2023-07-19': {
      periods: [
        {color: 'transparent'},
        {color: 'orange'}
      ]
    },
    '2023-07-20': {
      periods: [
        {startingDay: false, endingDay: true, color: 'transparent'},
        {startingDay: false, endingDay: true, color: 'orange'},
      ]
    },
    '2023-07-21': {
      periods: [
        {startingDay: true, endingDay: false, color: 'red'},
      ]
    },
    '2023-07-22': {
      periods: [
        {startingDay: false, endingDay: false, color: 'red'},
      ]
    },
    '2023-07-23': {
      periods: [
        {startingDay: false, endingDay: false, color: 'red'},
      ]
    },
    '2023-07-24': {
      periods: [
        {startingDay: false, endingDay: false, color: 'red'},
      ]
    },
  });

  useEffect(() => {
    const day = today.getDate().toString().length === 1 ? `0${today.getDate()}` : today.getDate();
    const month = today.getMonth().toString().length === 1 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
    const year = today.getFullYear();

    setCurrentDate(`${year}-${month}-${day}`);
  }, [today]);

  return (
    <>
      <Calendar
        className='border border-Gray m-3 rounded-lg'
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        minDate='2023-01-01'
        markingType="multi-period"
        markedDates={markedDates}
        customHeaderTitle={
          <View>
            <Text className='text-Purple text-lg font-bold'>{today.toLocaleDateString('pt-BR', {
              month: 'long',
            }).charAt(0).toUpperCase() + today.toLocaleDateString('pt-BR', {
              month: 'long',
            }).slice(1)}  {today.toLocaleDateString('pt-BR', {
              year: 'numeric',
            })}</Text>
          </View>
        }
        theme={{
          textDayStyle: {
            color: '#971cb7',
          },
          arrowColor: '#971cb7',
        }}
      />
    </>
  );
}

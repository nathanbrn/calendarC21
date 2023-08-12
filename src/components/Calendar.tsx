import { useContext, useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import { MarkedDate } from '../@types/calendar.props';
import { InfoContext } from '../context/infoContext';
import { formatDate } from '../utils/formatDate';

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

function createAlert() {
  Alert.alert('Marcação Inválida!', 'Você não pode marcar dias que não estejam na lista de consumo...', [
    {text: 'OK'},
  ]);
}

export function CalendarComponent() {
  const { date, infoChecked, setInfoChecked, markedDates, setMarkedDates } = useContext(InfoContext);

  function calculateFutureDate(date: Date, days: number) {
    const futureDate = new Date(date);
    futureDate.setDate(futureDate.getDate() + days);
    return futureDate.toISOString().slice(0, 10);
  }

  function updateMarkedDates() {
    const markedDatesCopy: Record<string, MarkedDate> = {};
    const markedStartDate: Record<string, MarkedDate> = {};

    const startDate = new Date(formatDate(date));
    const OneDayAfter = calculateFutureDate(startDate, 1);

    let j = OneDayAfter;

    let i = 1;
    let cor = 'orange';
    let step_a = 21;
    const step_b = 7;

    markedStartDate[startDate.toISOString().slice(0, 10)] = {
      periods: [
        { color: 'orange' },
      ],
    };

    for (j; j !== '2025-01-01'; j = calculateFutureDate(new Date(j), 1)) {

      const x = i % step_a;

      if(x == 0){
        step_a = 21 + step_a + step_b;
        cor = 'red';
      }

      const y = i % (step_b + 21);

      if(y == 0)
        cor = 'orange';

      markedDatesCopy[j] = {
        periods: [
          { color: cor },
        ],
      };

      i += 1;
    }

    setMarkedDates({ ...markedStartDate, ...markedDatesCopy, ...infoChecked });
  }

  useEffect(() => {
    updateMarkedDates();
  }, [date, infoChecked]);

  return (
    <>
      <Calendar
        onDayPress={(day) => {
          const dayString = day.dateString;
          setInfoChecked((prevState: Record<string, MarkedDates>) => {
            if (markedDates[dayString]?.periods[0]?.color === 'red') {
              return { ...prevState };
            }

            if (markedDates[dayString] === undefined) {
              createAlert();
              return { ...prevState };
            }

            if (prevState[dayString]) {
              const { [dayString]: value, ...rest } = prevState;
              return rest;
            }
            return { ...prevState, [dayString]: {
              periods: [
                { color: 'green'}
              ]
            } };
          });
        }}
        className='border border-Gray m-3 rounded-lg'
        minDate='2023-01-01'
        maxDate='2024-12-31'
        markingType="multi-period"
        markedDates={markedDates}
        renderHeader={(date) => (
          <View>
            <Text style={{ color: '#971cb7', fontSize: 16, fontWeight: 'bold' }}>
              {date.toString('MMMM yyyy')}
            </Text>
          </View>
        )}
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

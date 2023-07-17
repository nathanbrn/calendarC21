import { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { InfoContext } from '../context/infoContext';

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

  const { date } = useContext(InfoContext);
  const [daySelected, setDaySelected] = useState<string>(formatDate(date));

  function formatDate(date: string) {
    const [day, month, year] = date.split('/');

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  const [markedDates, setMarkedDates] = useState({
    [daySelected]: {
      periods: [
        {startingDay: true, endingDay: false, color: 'green'},
        {startingDay: true, endingDay: false, color: 'orange'}
      ]
    },
  });

  // Função para calcular a data futura com base em uma data de referência
  function calculateFutureDate(date: Date, days: number) {
    const futureDate = new Date(date);
    futureDate.setDate(futureDate.getDate() + days);
    return futureDate.toISOString().slice(0, 10);
  }

  // Função para atualizar as marcações dos dias
  function updateMarkedDates() {
    const markedDatesCopy = { ...markedDates };

    // Limpar marcações anteriores
    Object.keys(markedDatesCopy).forEach((date) => {
      delete markedDatesCopy[date];
    });

    // Marcar 21 dias a partir do dia selecionado com verde
    const startDate = new Date(daySelected);
    for (let i = 0; i < 21; i++) {
      const date = calculateFutureDate(startDate, i);
      markedDatesCopy[date] = { periods: [{ startingDay: true, endingDay: true, color: 'orange' }] };
    }

    // Marcar 8 dias após os 21 dias com vermelho
    const endDate = calculateFutureDate(startDate, 21);
    for (let i = 0; i < 8; i++) {
      const date = calculateFutureDate(new Date(endDate), i);
      markedDatesCopy[date] = { periods: [{ startingDay: true, endingDay: true, color: 'red' }] };
    }

    setMarkedDates(markedDatesCopy);
  }

  useEffect(() => {
    updateMarkedDates();
  }, [daySelected]);

  return (
    <>
      <Calendar
        className='border border-Gray m-3 rounded-lg'
        minDate='2023-01-01'
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

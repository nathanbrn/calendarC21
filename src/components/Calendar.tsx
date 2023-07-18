import { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
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

export function CalendarComponent() {
  const { date, infoChecked } = useContext(InfoContext);

  const [markedDates, setMarkedDates] = useState<Record<string, any>>({
    [formatDate(date)]: {
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
    const markedDatesCopy: Record<string, any> = { ...markedDates };

    // Obter todas as chaves de marcações existentes
    const existingDates = Object.keys(markedDatesCopy);

    // Marcar 21 dias a partir do dia selecionado com verde
    const startDate = new Date(formatDate(date));
    const endDate = new Date(calculateFutureDate(startDate, 20)); // Último dia dos 21 dias

    for (let i = 0; i < 21; i++) {
      const currentDate = calculateFutureDate(startDate, i);

      const startingDay = i === 0 || existingDates.includes(currentDate); // Marcar como true se for o primeiro dia ou se já estiver marcado anteriormente
      const endingDay = currentDate === endDate.toISOString().slice(0, 10); // Definir como true para o último dia

      markedDatesCopy[currentDate] = {
        periods: [
          { startingDay, endingDay, color: 'orange' },
        ],
      };
    }

    // Marcar 8 dias após os 21 dias com vermelho
    const finalEndDate = calculateFutureDate(endDate, 8); // Último dia dos 8 dias após os 21 dias

    for (let i = 1; i <= 8; i++) {
      const currentDate = calculateFutureDate(endDate, i);

      const startingDay = i === 1; // Definir como true para o primeiro dia após os 21 dias
      const endingDay = currentDate === finalEndDate; // Definir como true para o último dia dos 8 dias após os 21 dias

      markedDatesCopy[currentDate] = {
        periods: [
          { startingDay, endingDay, color: 'red' },
        ],
      };
    }

    // Atualizar marcações com base no infoChecked
    Object.entries(infoChecked).forEach(([date, { periods }]: [string, any]) => {
      if (markedDatesCopy[date]) {
        // Mesclar as marcações existentes com as novas marcações do infoChecked
        markedDatesCopy[date].periods = [...markedDatesCopy[date].periods, ...periods];
      } else {
        markedDatesCopy[date] = { periods };
      }

      const index = Object.keys(markedDatesCopy).findIndex((key) => key === date);
      if (index >= 0) {
        const isStartingDay = index === 0;
        const isEndingDay = index === Object.keys(markedDatesCopy).length - 1;
        markedDatesCopy[date].periods[0].startingDay = isStartingDay;
        markedDatesCopy[date].periods[0].endingDay = isEndingDay;
      }
    });

    setMarkedDates(markedDatesCopy);
  }



  useEffect(() => {
    updateMarkedDates();
  }, [formatDate(date), infoChecked]);

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

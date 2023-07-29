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

interface Props {
  dataChecked?: Record<string, any>;
}

export function CalendarComponent({ dataChecked }: Props) {
  const { date, infoChecked } = useContext(InfoContext);

  const [markedDates, setMarkedDates] = useState<Record<string, any>>({});

  // Função para calcular a data futura com base em uma data de referência
  function calculateFutureDate(date: Date, days: number) {
    const futureDate = new Date(date);
    futureDate.setDate(futureDate.getDate() + days);
    return futureDate.toISOString().slice(0, 10);
  }

  // Função para atualizar as marcações dos dias
  function updateMarkedDates() {
    const markedDatesCopy: Record<string, any> = {};

    // Marcar 21 dias a partir do dia selecionado com laranja
    const startDate = new Date(formatDate(date));

    let j = startDate.toISOString().slice(0, 10);

    let i = 1;
    let cor = 'orange';
    let step_a = 21;
    const step_b = 7;

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

    setMarkedDates({ ...markedDatesCopy, ...dataChecked });
  }

  useEffect(() => {
    updateMarkedDates();
  }, [date, infoChecked]);

  return (
    <>
      <Calendar
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

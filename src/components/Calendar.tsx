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

  return (
    <>
      <Calendar
        className='border border-Gray m-3 rounded-lg'
        onDayPress={ day => alert(`selected day, ${day.dateString}`) }
        minDate='2023-01-01'
        markingType="dot"
        markedDates={{
          '2023-07-08' : { selected: true, marked: true, selectedColor: 'purple' },
        }}
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
        }}
      />
    </>
  );
}

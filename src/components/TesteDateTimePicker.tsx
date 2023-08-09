import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from './';
import { formatDate } from '../utils/formatDate';

type AndroidMode = 'date' | 'time' | 'datetime' | 'countdown';

interface Props {
  type: 'date' | 'time';
}

export const TesteDateTimePicker = ({ type }: Props) => {
  const [date, setDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<AndroidMode | undefined>();
  const [show, setShow] = useState<boolean>(false);

  const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate;
    setShow(false);
    currentDate ? setDate(currentDate) : setDate(new Date());
  };

  const showMode = (currentMode: AndroidMode | undefined) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      {type === 'date' && (
        <Button onClick={showDatepicker} type='primary' description='Data' />
      )}

      {type === 'time' && (
        <Button onClick={showTimepicker} type='primary' description='Hora' />
      )}

      <Text className='text-xl font-bold'>{formatDate(date?.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }))}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          onChange={onChange}
        />
      )}
    </View>
  );
};

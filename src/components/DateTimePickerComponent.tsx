import { Feather } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useContext, useState } from 'react';
import { View } from 'react-native';
import { InfoContext } from '../context/infoContext';
import { Button } from './';

type AndroidMode = 'date' | 'time' | 'datetime' | 'countdown';

interface Props {
  type: 'date' | 'time';
  setSecondaryModalVisible: (value: boolean) => void;
  setTertiaryModalVisible: (value: boolean) => void;
}

export const DateTimePickerComponent = ({ type, setSecondaryModalVisible, setTertiaryModalVisible }: Props) => {
  const [dateRef, setDateRef] = useState<Date>(new Date());
  const [hourRef, setHourRef] = useState<Date>(new Date());
  const [mode, setMode] = useState<AndroidMode | undefined>();
  const [show, setShow] = useState<boolean>(false);

  const { date, hour, setHour, setDate } = useContext(InfoContext);

  const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate;
    setShow(false);

    if (mode === 'date') {
      currentDate ? setDateRef(currentDate) : setDateRef(new Date());
      setDate(currentDate?.toISOString().slice(0, 10));
      console.log(date);
      setSecondaryModalVisible(false);
      setTertiaryModalVisible(true);
    }

    if (mode === 'time') {
      currentDate ? setHourRef(currentDate) : setHourRef(new Date());
      const currentHour = currentDate?.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).slice(0, 8);
      setHour(currentHour);
      console.log(hour);
    }
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
        <Button
          onClick={showDatepicker}
          type='date'
          description='Data'
          icon={<Feather name='calendar' size={24} color='white' />}
        />
      )}

      {type === 'time' && (
        <Button
          onClick={showTimepicker}
          type='time'
          description='Hora'
          icon={<Feather name='clock' size={24} color='white' />}
        />
      )}

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={mode === 'date' ? dateRef : hourRef}
          mode={mode}
          onChange={onChange}
          locale='pt-BR'
          minimumDate={new Date('2023-01-01')}
          maximumDate={new Date('2024-12-31')}
        />
      )}
    </View>
  );
};

import { ReactNode, createContext, useState } from 'react';
import { MarkedDate } from '../@types/calendar.props';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const InfoContext = createContext<any>({});

interface InfoProviderProps {
  children: ReactNode;
}

export const InfoProvider = ({ children }: InfoProviderProps) => {
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [hour, setHour] = useState<string>('');
  const [infoChecked, setInfoChecked] = useState({});
  const [markedDates, setMarkedDates] = useState<Record<string, MarkedDate>>({});

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const name = await AsyncStorage.getItem('@avoidchild:name');
  //       const date = await AsyncStorage.getItem('@avoidchild:date');
  //       const hour = await AsyncStorage.getItem('@avoidchild:hour');

  //       if (name) {
  //         setName(name);
  //       }

  //       if (date) {
  //         setDate(date);
  //       }

  //       if (hour) {
  //         setHour(hour);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await AsyncStorage.setItem('@avoidchild:name', name);
  //       await AsyncStorage.setItem('@avoidchild:date', date);
  //       await AsyncStorage.setItem('@avoidchild:hour', hour);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, [name, date, hour]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const infoChecked = await AsyncStorage.getItem('@avoidchild:infoChecked');

  //       if (infoChecked) {
  //         setInfoChecked(JSON.parse(infoChecked));
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await AsyncStorage.setItem('@avoidchild:infoChecked', JSON.stringify(infoChecked));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, [infoChecked]);

  // useEffect(() => {
  //   (async () => {
  //     await AsyncStorage.removeItem('@avoidchild:infoChecked');
  //     await AsyncStorage.removeItem('@avoidchild:name');
  //     await AsyncStorage.removeItem('@avoidchild:date');
  //     await AsyncStorage.removeItem('@avoidchild:hour');
  //   })();
  // }, []);

  return (
    <InfoContext.Provider value={{
      name,
      date,
      hour,
      infoChecked,
      setName,
      setDate,
      setHour,
      setInfoChecked,
      markedDates,
      setMarkedDates
    }}>
      {children}
    </InfoContext.Provider>
  );
};

import { ReactNode, createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const InfoContext = createContext<any>({});

interface InfoProviderProps {
  children: ReactNode;
}

export const InfoProvider = ({ children }: InfoProviderProps) => {
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [infoChecked, setInfoChecked] = useState({});
  const [markedDates, setMarkedDates] = useState<Record<string, any>>({});

  useEffect(() => {
    (async () => {
      try {
        const name = await AsyncStorage.getItem('@avoidchild:name');
        const date = await AsyncStorage.getItem('@avoidchild:date');

        if (name) {
          setName(name);
        }

        if (date) {
          setDate(date);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('@avoidchild:name', name);
        await AsyncStorage.setItem('@avoidchild:date', date);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [name, date]);

  return (
    <InfoContext.Provider value={{
      name,
      date,
      infoChecked,
      setName,
      setDate,
      setInfoChecked,
      markedDates,
      setMarkedDates
    }}>
      {children}
    </InfoContext.Provider>
  );
};

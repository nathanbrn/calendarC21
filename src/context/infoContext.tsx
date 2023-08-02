import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReactNode, createContext, useEffect, useState } from 'react';

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

  useEffect(() => {
    (async () => {
      try {
        const infoChecked = await AsyncStorage.getItem('@avoidchild:infoChecked');

        if (infoChecked) {
          setInfoChecked(JSON.parse(infoChecked));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('@avoidchild:infoChecked', JSON.stringify(infoChecked));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [infoChecked]);

  // useEffect(() => {
  //   (async () => {
  //     await AsyncStorage.removeItem('@avoidchild:infoChecked');
  //     await AsyncStorage.removeItem('@avoidchild:name');
  //     await AsyncStorage.removeItem('@avoidchild:date');
  //   })();
  // }, []);

  console.log(infoChecked);

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

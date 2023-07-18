import { ReactNode, createContext, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const InfoContext = createContext<any>({});

interface InfoProviderProps {
  children: ReactNode;
}

export const InfoProvider = ({ children }: InfoProviderProps) => {
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [infoChecked, setInfoChecked] = useState({});

  return (
    <InfoContext.Provider value={{
      name,
      date,
      infoChecked,
      setName,
      setDate,
      setInfoChecked
    }}>
      {children}
    </InfoContext.Provider>
  );
};

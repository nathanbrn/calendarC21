import { ReactNode, createContext, useState } from 'react';

export const InfoContext = createContext<any>({});

interface InfoProviderProps {
  children: ReactNode;
}

export const InfoProvider = ({ children }: InfoProviderProps) => {
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');

  return (
    <InfoContext.Provider value={{
      name,
      date,
      setName,
      setDate
    }}>
      {children}
    </InfoContext.Provider>
  );
};

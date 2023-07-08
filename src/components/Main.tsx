import { View } from 'react-native';

interface MainProps {
  children?: React.ReactNode;
}

export function Main({ children }: MainProps) {
  return (
    <View className='flex-1 bg-Purple'>
      <View className='items-center mx-auto'>
      </View>
      {children}
    </View>
  );
}

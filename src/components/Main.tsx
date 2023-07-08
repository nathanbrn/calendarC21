import { View } from 'react-native';
import { Logo } from './Logo';

interface MainProps {
  children?: React.ReactNode;
}

export function Main({ children }: MainProps) {
  return (
    <View className='flex-1 bg-Purple items-center'>
      <View className='bg-Purple item-center mt-8'>
        <Logo />
      </View>
      <View className='items-center mx-auto'>
      </View>
      {children}
    </View>
  );
}

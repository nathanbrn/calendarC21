import { Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  description?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export function Button({ description, onClick, icon }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onClick}
      className='flex-col mx-auto mb-1 bg-Blue py-2 px-3 rounded-md items-center justify-center'>
      { icon && <Text className='text-white text-xl font-bold'>{icon}</Text>}
      { description && <Text className='text-white text-sm font-bold'>{description}</Text>}
    </TouchableOpacity>
  );
}
